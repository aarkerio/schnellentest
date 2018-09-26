# coding: utf-8
# frozen_string_literal: true
# Chipotle Software (c) 2016-2018 GPL

require 'hamster'

class Test < ApplicationRecord

  # Relationships
  belongs_to :user

  has_many :question_tests, -> { order(:order) }
  has_many :questions, through: :question_tests

  # Scopes
  scope :active, -> { where(active: true) }

  # Validations
  validates :title, presence: true

  # Methods
  # -------------------------------------------------------

  def create_test(params)
    create_params = order_params params
    test = Test.new create_params
    test.save
  end

  # Get one test and its questions
  def get_one
    serialize_test
  end

  # Returns all questions by subject or tag
  def search(params)
    terms = params[:terms]
    # SELECT id, question FROM questions WHERE searchtext @@ 'lorem' AND NOT EXISTS( SELECT question_id FROM tests_questions WHERE test_id=1);
    # SELECT q.id, q.question FROM questions AS q WHERE q.searchtext @@ 'lorem' AND NOT EXISTS(SELECT q1.id FROM test_questions AS tq, questions AS q1 WHERE tq.question_id=q1.id AND tq.test_id=1);
    sanitized = ActiveRecord::Base.send(:sanitize_sql_array, ["to_tsquery('english', ?)", terms.gsub(/\s/,"+")])
    Question.where("searchtext @@ #{sanitized} AND id NOT IN(SELECT question_id AS id FROM test_questions WHERE test_id=#{id})").paginate(page: params[:page], per_page: params[:per_page]).select(:id, :question, :explanation, :hint, :tags, :qtype)
  end

  def link_questions(params)
    results = params[:question_ids].map do |qid|
      TestQuestion.find_or_create_by(test_id: id, question_id: qid['id'])
    end
    results.include? false
  end

  def reorder(params)
    qt = question_tests.where(question_id: params[:question_id].to_i).first
    if params[:way] == 'down'
      qt_up = qt.next
      order = qt_up.order
      qt_up.update_attribute(:order, qt.order)
      qt.update_attribute(:order, order)
    else
      qt_go_down = qt.next
      order = qt_go_down.order.to_i
      qt_go_down.update_attribute(:order, qt.order.to_i)
      qt.update_attribute(:order, order)
    end
    true
  end

  private

  # Private: Order a new test hash.
  #
  # appo_id - The Integer number of appointemnt id.
  #
  # Returns hash object or nil.
  def order_params(params)
    Hamster::Hash[
      title:       params['title'],
      description: params['description'],
      tags:        params['tags'],
      active:      params['active'],
      shared:      params['shared'],
      user_id:     params['user_id']]
  end

  # Private
  # Serialize a test and its questions
  # Returns Hash.
  def serialize_test
    all               = Hash.new
    all[:id]          = id
    all[:title]       = title
    all[:description] = description
    all[:tags]        = tags
    all[:active]      = active
    all[:shared]      = shared
    all[:questions]   = []
    questions.select(:id, :question, :hint, :explanation, :tags, :qtype, :active, :lang, :worth, :status).each do |q|
      all[:questions] << q
    end
    all
  end

end

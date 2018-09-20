# coding: utf-8
#  Chipotle Software (c) 2016-2018   MIT License
class Question < ApplicationRecord
  belongs_to :user
  has_many   :answer, dependent: :destroy
  has_many   :composite_answer, dependent: :destroy

  validates :question, presence: true
  validates :qtype, presence: true
  validates :lang, presence: true

  accepts_nested_attributes_for :answer

  # qtype column:   1: multiple option, 2: open, 3: true/false, 4: fullfill, 5: composite questions

  def create_question(params)
    test = Test.find params['test_id']
    create_params = order_params params
    question = Question.new(create_params)
    question.save!
    test.question_tests.create! question_id: question.id
  end

  def get_one(id)
    question = Question.includes(:answer).where(id: id).first
    newhash  = order_answers(question)
    newhash
  end

  private

  # Private: Sabe a new question.
  #
  # appo_id - The Integer number of appointemnt id.
  #
  # Returns hash object or nil.
  def order_params(params)
    {
      question:    params['question'],
      explanation: params['explanation'],
      hint:        params['hint'],
      worth:       params['worth'],
      tags:        params['tags'],
      active:      params['active'],
      qtype:       params['qtype'],
      user_id:     params['user_id']
    }
  end

  # Private. Order fields to set answers
  #
  # Returns. Object or nil
  def order_answers(question)
    all               = Hash.new
    all[:question]    = question.question
    all[:id]          = question.id
    all[:answers]   = Array.new
    # TODO:  question.answer.reduce({})
    question.answer.each do |a|
      all[:answers] << a
    end
    all
  end
end


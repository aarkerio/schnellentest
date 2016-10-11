#  Chipotle Software (c) 2016   MIT License
class Question < ApplicationRecord
  belongs_to :user
  has_many   :answer

  validates :question, presence: true

  self.per_page = 10

  def create_question(params)
    test = Test.find params['test_id']
    create_params = order_params params
    test.question.create create_params
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
    question.answer.each do |a|
      all[:answers] << a
    end
    all
  end

end


# GPLv3 Chipotle Software (c) 2016
class Question < ApplicationRecord
  belongs_to :user
  has_many   :answer

  default_scope { order('id DESC') }

  validates :question, presence: true

  def create_question(params)
    test = Test.find params['test_id']
    create_params = order_params params
    logger.debug "88888888 >>>  create_params >>>   #{create_params.inspect}"
    test.question.create create_params
  end

  def get_one(question_id)
    question = Question.includes(:answer).where(id: question_id).first
    newhash  = order_answers(question)
    # logger.debug "88888888 >>>  get_one data   #{newhash.inspect}"
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


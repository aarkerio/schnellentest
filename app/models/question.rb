# GPLv3 Chipotle Software (c) 2016
class Question < ApplicationRecord
  belongs_to :user

  default_scope { order('id DESC') }

  validates :question, presence: true

  def create_question(params)
    create_params = order_params params
    logger.debug create_params.inspect
    test = Test.find params[:test_id]
    test.question.create create_params
  end
  
  def self.get_one(question_id)
    data = where(id: question_id).includes(:test_question)
    logger.debug data.inspect
    data
  end

  private

  # Private: Sabe a new question.
  #
  # appo_id - The Integer number of appointemnt id.
  #
  # Returns hash object or nil.
  def order_params(params)
    test_question = TestQuestion.where( ["test_id = ?", params[:test_id]]).select(:order).first
    order = test_question.order.nil?  ?  0  :  test_question.order.to_i + 1 
    { 
      question:    params['question'],
      explanation: params['explanation'],
      hint:        params['hint'],
      worth:       params['worth'],
      tags:        params['tags'],
      active:      params['active'],
      user_id:     params['user_id'],
      order:       order
    }
  end
  
end


# GPLv3 Chipotle Software (c) 2016
class Question < ApplicationRecord
  belongs_to :user

  default_scope { order('id DESC') }

  validates :question, presence: true

  def create_question(params)
    logger.debug " ###>>>>>> create_question params #{params.inspect} "
    test = Test.find params['test_id']
    create_params = order_params params
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
    { 
      question:    params['question'],
      explanation: params['explanation'],
      hint:        params['hint'],
      worth:       params['worth'],
      tags:        params['tags'],
      active:      params['active'],
      user_id:     params['user_id']
    }
  end
  
end


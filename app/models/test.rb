# GPLv3 Chipotle Software (c) 2016

class Test < ApplicationRecord
  belongs_to :user
  has_many :test_question
  has_many :question, through: :test_question 

  validates :title, presence: true

  
  def create_test(params)
    create_params = order_params params
    logger.debug create_params.inspect
    test = Test.new create_params
    test.save
  end
  
  def self.get_one(test_id)
    data = where(id: test_id).includes(:question)
    logger.debug data.inspect
    data
  end

  private

  # Private: Sabe a new test.
  #
  # appo_id - The Integer number of appointemnt id.
  #
  # Returns hash object or nil.
  def order_params(params)
    { title:       params['title'],
      description: params['description'],
      tags:        params['tags'],
      active:      params['active'],
      shared:      params['shared'],
      user_id:     params['user_id']
    }
  end

end

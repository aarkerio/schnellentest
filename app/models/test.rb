# Chipotle Software (c) 2016 MIT License

class Test < ApplicationRecord
  belongs_to :user
  has_many :test_question
  has_many :question, through: :test_question

  validates :title, presence: true

  
  def create_test(params)
    create_params = order_params params
    #logger.debug create_params.inspect
    test = Test.new create_params
    test.save
  end
  
  def get_one
    nest_questions(self)
  end

  private

  # Private: Order a new test hash.
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

  def nest_questions(test)
    all               = Hash.new
    all[:title]       = test.title
    all[:description] = test.description
    all[:id]          = test.id
    all[:questions]   = []
    test.question.each do |q|
      all[:questions] << q 
    end
    all
  end

end

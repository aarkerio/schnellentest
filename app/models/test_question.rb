# GPLv3 Chipotle Software (c) 2016

class TestQuestion < ApplicationRecord
  belongs_to :test
  belongs_to :question

  validates :test_id, presence: true 
  validates :question_id, presence: true

  before_create :set_order

  # default_scope { order('order') }

  private 

  # Private.
  # Set sequence on order column
  def set_order
    test_question = self.test.test_question.order('id DESC').select(:order).first
    order = (test_question.nil? || test_question.order.nil?)  ?  0  :  test_question.order.to_i + 1
    self.order   = order
  end
end


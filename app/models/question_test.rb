# GPLv3 Chipotle Software (c) 2016-2017

class QuestionTest < ApplicationRecord
  belongs_to :test
  belongs_to :question

  validates :test_id, presence: true
  validates :question_id, presence: true

  before_create :set_order

  def next
    self.class.where("\"order\" > ? AND test_id = ?", order, test_id).order("\"order\" ASC").first
  end

  def previous
    self.class.where("\"order\" < ? AND test_id = ?", order, test_id).order("\"order\" DESC").first
  end

  def unlink(params)
    tq = TestQuestion.where(test_id: params[:test_id], question_id: params[:id]).first
    tq.destroy
  end

  private

  # Private.
  # Set sequence on order column
  def set_order
    test_question = self.class.where("test_id = ?", test_id).order("\"order\" DESC").first
    order = (test_question.nil? || test_question.order.nil?)  ?  1  :  test_question.order.to_i + 1
    self.order   = order
  end
end


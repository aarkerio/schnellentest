class Post < ApplicationRecord
  belongs_to :user

  validates :user_id, presence: true
  validates :title, presence: true, length: { minimum: 3 }
  validates :body, presence: true, length: { minimum: 10 }
  validates :published, inclusion: { in: [false, true],
                                     message: "%{value} is not a valid boolean" }, allow_nil: false
end


def find_outlier(integers)
  integers.partition{ |v| v.even? }.find(&:one?).first
end

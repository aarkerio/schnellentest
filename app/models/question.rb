# GPLv3 Chipotle Software (c) 2016
class Question < ApplicationRecord
  belongs_to :user

  default_scope { order('id DESC') }

  validates :question, presence: true
  
end

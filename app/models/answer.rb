# GPLv3 Chipotle Software (c) 2016
class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :question

end

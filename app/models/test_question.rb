# GPLv3 Chipotle Software (c) 2016

class TestQuestion < ApplicationRecord
  belongs_to :test
  belongs_to :question
end

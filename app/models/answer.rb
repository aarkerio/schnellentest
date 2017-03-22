# coding: utf-8
# frozen_string_literal: true
# GPLv3 Chipotle Software (c) 2016
class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :question

  validates :answer, presence: true
  validates :correct, presence: true

end

# coding: utf-8
# frozen_string_literal: true
# GPLv3 Chipotle Software (c) 2016-2017
class CompositeAnswer < ApplicationRecord
  belongs_to :question
  belongs_to :user

  validates :first_column, presence: true
  validates :second_column, presence: true
  validates :correct_column, presence: true
  validates :name_column, presence: true

end

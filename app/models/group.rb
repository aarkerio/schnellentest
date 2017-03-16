# coding: utf-8
# frozen_string_literal: true
# GPLv3 Chipotle Software (c) 2016-2017
class Group < ApplicationRecord
  has_many :user, dependent: :destroy
end

# coding: utf-8
# frozen_string_literal: true
# GPLv3 Chipotle Software (c) 2016-2017
class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :question, counter_cache: true  #http://yerb.net/blog/2014/03/13/three-easy-steps-to-using-counter-caches-in-rails/

  validates :answer, presence: true
  validates :correct, inclusion: { in: [ true, false ] }

end

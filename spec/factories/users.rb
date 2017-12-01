# coding: utf-8
# frozen_string_literal: true
# Chipotle Software (c) 2016-2017

FactoryBot.define do
  factory :user, class: User do
    uname  { FFaker::Internet.user_name }
    fname  { FFaker::Name.first_name }
    lname  { FFaker::Name.last_name }
    active true
    email  { FFaker::Internet.email }
    password { FFaker::Internet.password  }
    association :group, factory: :group
  end

end

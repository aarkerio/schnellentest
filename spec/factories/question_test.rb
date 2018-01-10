# coding: utf-8
# frozen_string_literal: true

# Chipotle Software (c) 2016-2017  MIT License
FactoryBot.define do
  factory :question_tests, class: 'QuestionTest' do
    question
    test
  end
end

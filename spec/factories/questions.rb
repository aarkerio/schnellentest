# coding: utf-8
# frozen_string_literal: true
# Chipotle Software (c) 2016-2017  MIT License
FactoryBot.define do
  factory :question do
    question  { 'The question is ' + FFaker::Lorem.words.join(' ') + ' ?'   }
    hint { 'Hint ' + FFaker::Lorem.words.join(' ')   }
    explanation { 'Explanation ' + FFaker::Lorem.words.join(' ')   }
    worth 1
    active false
    qtype 1
    user nil
    lang 'en'
    status 0
    factory :question_with_test do
       transient do
         test nil
       end

       after(:create) do |question, evaluator|
         create(:question_tests, question: question, test: evaluator.test)
       end
     end
  end

end

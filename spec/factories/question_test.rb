# Chipotle Software (c) 2016-2017  MIT License
FactoryGirl.define do
  factory :question_tests, class: 'QuestionTest' do
    question
    test
  end
end

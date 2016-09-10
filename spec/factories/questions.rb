# Chipotle Software (c) 2016  MIT License  
FactoryGirl.define do
  factory :question do
    question  { 'The question is ' + FFaker::Lorem.words.join(' ') + ' ?'   }
    hint { 'Hint ' + FFaker::Lorem.words.join(' ')   }
    explanation { 'Explanation ' + FFaker::Lorem.words.join(' ')   }
    worth 1
    active false
    qtype true
    user nil
    lang 'en'
    status 0
  end
end

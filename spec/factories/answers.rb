# Chipotle Software (c) 2016   MIT License 
FactoryGirl.define do
  factory :answer do
    answer { 'Die Antwort ist ' + FFaker::Lorem.words.join(' ')   }
    correct false
    active true
    question nil
  end
end


# Chipotle Software (c) 2016   MIT License 
FactoryGirl.define do
  factory :answer do
    user nil
    answer { 'Answer ' + FFaker::Lorem.words.join(' ')   }
    correct false
    question nil
  end
end


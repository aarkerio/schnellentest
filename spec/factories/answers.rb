FactoryGirl.define do
  factory :answer do
    user nil
    answer "MyText"
    correct false
    question nil
  end
end

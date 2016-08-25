FactoryGirl.define do
  factory :question do
    user nil
    question "MyText"
    hint "MyText"
    explanation "MyText"
    worth 1
    active false
    type false
  end
end

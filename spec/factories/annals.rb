FactoryGirl.define do
  factory :annal do
    user nil
    notes "MyString"
    sumcheck "MyString"
    file "MyString"
    oname 'some_file.pdf'
    content 'somex text'
    json  '{some json}'
    spellcheck false
    copyright false
  end
end

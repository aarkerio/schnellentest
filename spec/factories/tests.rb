# Chipotle Software (c) 2016  MIT License

FactoryGirl.define do
  factory :test do
    title        { 'Test title ' + FFaker::Lorem.words.join(' ')   }
    description  { 'Test description ' + FFaker::Lorem.words.join(', ')  }
    tags         {  FFaker::Lorem.words.join(' ')  }
    active       true
    shared       false
    user
  end
end


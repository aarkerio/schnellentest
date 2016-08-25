FactoryGirl.define do
  factory :user do
    email { FFaker::Internet.email  }
    username { "#{FFaker::Name.first_name}_#{Random.rand(5)}"  }
    fname 'Mark'
    lname 'Mixx'
    password 'password'
    password_confirmation 'password'
    group_id 1
  end
end

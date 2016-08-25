FactoryGirl.define do
  factory :appointment do
    scheduled_time { Date.now  }
    pet { FFaker::Name.first_name  }
    reminder false
    reason_for_visit "MyString"
    doctor_id 1
  end
end

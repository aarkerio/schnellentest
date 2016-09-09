FactoryGirl.define do
  factory :group do
    name 'Admin'
    description 'Description'
  end
end

data = [{name: 'Admin'}, {name: 'Teacher group'},{name: 'Student group'}, {name: 'Staff'}]
result = data.map { |p| FactoryGirl.create(:group, p) }



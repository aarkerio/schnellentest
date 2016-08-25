# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

 admin      = Group.create! name: 'admin', description: 'admin'
 customers  = Group.create! name: 'customers', description: 'customers'
 staff      = Group.create! name: 'staff', description: 'staff'

unless User.exists?(username: 'admin')
  admin  = User.create! username: "admin", email: "admin@example.com", password: 'password', fname: 'admin', lname: 'admin', group_id: admin.id, active: true
end

ctmr_1 = User.create! username: "customer_#{Random.rand(1000)}",email: "adoc_#{Random.rand(1000)}@exale.com",password: 'password',fname: 'Ric customer', lname: 'Mayer', group_id: customers.id, active: true
ctmr_2 = User.create! username: "doc_#{Random.rand(1000)}",email: "adogc_#{Random.rand(1000)}@exahle.com",password: 'password',fname: 'Luis', lname: 'Salgado', group_id: customers.id, active: true
ctmr_3 = User.create! username: "customera_#{Random.rand(1000)}",email: "aoc_#{Random.rand(1000)}@ehxale.com",password: 'password',fname: 'Andrea', lname: 'Mayer', group_id: customers.id, active: true

test_1  = Test.create! name: 'Test Eins',  description: 'Test Eins Description' active: true
test_2  = Test.create! name: 'Test Zweig', description: 'Test Zweig Description' active: true
test_3  = Test.create! name: 'Test Drei',  description: 'Test Drei Description' active: true

appo1 = {
  date: 2.days.from_now.change(hour: 7),
  pet_id: pet_1.id,
  reminder:  true,
  active:  true,
  reason: 'pain in leg',
  customer_id: customer_1.id,
  owner_id: owner_1.id
}
u1 = Appointment.create! appo1

pet_2 = Pet.create! name: 'Totopo', age: 3, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_2.id, active: true

appo2 = {
  date: 10.days.from_now.change(hour: 7),
  pet_id: pet_2.id,
  reminder:  true,
  active:  true,
  reason: 'Allergic itchy',
  customer_id: customer_2.id,
  owner_id: owner_2.id
}
u2 = Appointment.create! appo2

pet_3  = Pet.create! name: 'Max', age: 4, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_3.id, active: true
appo3 = {
  date: 9.days.from_now.change(hour: 7),
  pet_id: pet_3.id,
  reminder:  true,
  active:  true,
  reason: 'Vaccines',
  customer_id: customer_1.id,
  owner_id: owner_3.id
}
u3 = Appointment.create! appo3

pet_4  = Pet.create! name: 'Sally', age: 3, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_4.id, active: true
appo4 = {
  date: 4.days.from_now.change(hour: 7),
  pet_id: pet_4.id,
  reminder:  true,
  active:  true,
  reason: 'Infection',
  customer_id: customer_1.id,
  owner_id: owner_4.id
}
u4 = Appointment.create! appo4

pet_5  = Pet.create! name: 'Wacky', age: 1, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_5.id, active: true
appo5 = {
  date: 4.days.from_now.change(hour: 7),
  pet_id: pet_5.id,
  reminder:  true,
  active:  true,
  reason: 'Infection',
  customer_id: customer_1.id,
  owner_id: owner_5.id
}
u5 = Appointment.create! appo5

pet_6  = Pet.create! name: 'Omar', age: 1, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_6.id, active: true
appo6 = {
  date: 4.days.from_now.change(hour: 7),
  pet_id: pet_6.id,
  reminder:  true,
  active:  true,
  reason: 'Infection',
  customer_id: customer_1.id,
  owner_id: owner_6.id
}
u6 = Appointment.create! appo6

pet_7  = Pet.create! name: 'Lukas', age: 2, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_7.id, active: true
appo7 = {
  date: 4.days.from_now.change(hour: 7),
  pet_id: pet_7.id,
  reminder:  true,
  active:  true,
  reason: 'Infection',
  customer_id: customer_1.id,
  owner_id: owner_7.id
}
u7 = Appointment.create! appo7

pet_8  = Pet.create! name: 'Willy', age: 8, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_8.id, active: true
appo8 = {
  date: 4.days.from_now.change(hour: 7),
  pet_id: pet_8.id,
  reminder:  true,
  active:  true,
  reason: 'Infection',
  customer_id: customer_2.id,
  owner_id: owner_8.id
}

pet_9  = Pet.create! name: 'Calcio', age: 2, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_7.id, active: true
pet_10  = Pet.create! name: 'Queso', age: 8, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_8.id, active: true

pet_11  = Pet.create! name: 'Tama', age: 1, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_8.id, active: true
appo11 = {
  date: 4.days.from_now.change(hour: 7),
  pet_id: pet_11.id,
  reminder:  true,
  active:  true,
  reason: 'Infection',
  customer_id: customer_1.id,
  owner_id: owner_8.id
}

u11 = Appointment.create! appo11

pet_12  = Pet.create! name: 'Lana', age: 2, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_9.id, active: true

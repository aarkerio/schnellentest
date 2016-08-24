# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

 admin   = Group.create! name: 'admin', description: 'admin'
 owners  = Group.create! name: 'owners', description: 'owners'
 doctors = Group.create! name: 'doctors', description: 'doctors'
 staff   = Group.create! name: 'staff', description: 'staff'


kinds = %w(cat dog reptile bird horse)

kinds.each do |kind|
  Kind.create! name: kind
end

kind = Kind.find_by_name 'dog'

unless User.exists?(username: 'admin')
  admin  = User.create! username: "admin", email: "admin@example.com", password: 'password', fname: 'admin', lname: 'admin', group_id: admin.id, active: true
end

doctor_1 = User.create! username: "doctor_#{Random.rand(1000)}",email: "adoc_#{Random.rand(1000)}@exale.com",password: 'password',fname: 'Ric doctor', lname: 'Mayer', group_id: doctors.id, active: true
doctor_2 = User.create! username: "doc_#{Random.rand(1000)}",email: "adogc_#{Random.rand(1000)}@exahle.com",password: 'password',fname: 'Luis', lname: 'Salgado', group_id: doctors.id, active: true
doctor_3 = User.create! username: "doctora_#{Random.rand(1000)}",email: "aoc_#{Random.rand(1000)}@ehxale.com",password: 'password',fname: 'Andrea', lname: 'Mayer', group_id: doctors.id, active: true
doctor_4 = User.create! username: "alo_#{Random.rand(1000)}",email: "lao_#{Random.rand(1000)}@hxale.com",password: 'password',fname: 'Lalo', lname: 'Herrera', group_id: doctors.id, active: true
owner_1  = User.create! username: "manuel_#{Random.rand(1000)}",email: "owner_#{Random.rand(1000)}@eample.com",password: 'password',fname: 'Manuel', lname: 'Hurtado', group_id: owners.id, active: true
owner_2  = User.create! username: "mario_#{Random.rand(1000)}",email: "owggh_#{Random.rand(1000)}@exmyple.com",password: 'password',fname: 'Mario', lname: 'Soto', group_id: owners.id, active: true
owner_3  = User.create! username: "lon_#{Random.rand(1000)}",email: "osusan_#{Random.rand(1000)}@exnynple.com",password: 'password',fname: 'Susan', lname: 'McCarthy', group_id: owners.id, active: true
owner_4  = User.create! username: "robert_#{Random.rand(1000)}",email: "owner_#{Random.rand(1000)}@eattmple.com",password: 'password',fname: 'Robert', lname: 'Gonzalez', group_id: owners.id, active: true
owner_5  = User.create! username: "marion_#{Random.rand(1000)}",email: "owggh_#{Random.rand(1000)}@exkkmple.com",password: 'password',fname: 'Mariana', lname: 'Marilian', group_id: owners.id, active: true
owner_6  = User.create! username: "laura_#{Random.rand(1000)}",email: "osusan_#{Random.rand(1000)}@exkknnple.com",password: 'password',fname: 'Karla', lname: 'Lopez', group_id: owners.id, active: true
owner_7  = User.create! username: "rick_#{Random.rand(1000)}",email: "owner_#{Random.rand(1000)}@eamplkke.com",password: 'password',fname: 'Sucliff', lname: 'Soho', group_id: owners.id, active: true
owner_8  = User.create! username: "martina_#{Random.rand(1000)}",email: "owggh_#{Random.rand(1000)}@exkmple.com",password: 'password',fname: 'Luis', lname: 'Estrada', group_id: owners.id, active: true
owner_9  = User.create! username: "lonaa_#{Random.rand(1000)}",email: "osusan_#{Random.rand(1000)}@exnhple.com",password: 'password',fname: 'Carl', lname: 'Jonas', group_id: owners.id, active: true

pet_1  = Pet.create! name: 'Babby', age: 4, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_1.id, active: true
appo1 = {
  date: 2.days.from_now.change(hour: 7),
  pet_id: pet_1.id,
  reminder:  true,
  active:  true,
  reason: 'pain in leg',
  doctor_id: doctor_1.id,
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
  doctor_id: doctor_2.id,
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
  doctor_id: doctor_1.id,
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
  doctor_id: doctor_1.id,
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
  doctor_id: doctor_1.id,
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
  doctor_id: doctor_1.id,
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
  doctor_id: doctor_1.id,
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
  doctor_id: doctor_2.id,
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
  doctor_id: doctor_1.id,
  owner_id: owner_8.id
}

u11 = Appointment.create! appo11

pet_12  = Pet.create! name: 'Lana', age: 2, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_9.id, active: true

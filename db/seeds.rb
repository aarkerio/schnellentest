# Chipotle Software 2016 (c)  MIT License 

admin      = Group.create! name: 'admin', description: 'admin'
customers  = Group.create! name: 'customers', description: 'customers'
staff      = Group.create! name: 'staff', description: 'staff'

unless User.exists?(username: 'admin')
  admin  = User.create! username: "admin", email: "admin@example.com", password: 'password', fname: 'admin', lname: 'admin', group_id: admin.id, active: true
end

ctmr_1 = User.create! username: "emily77", email: 'emily@exale.com', password: 'password', fname: 'Emily',lname: 'Mayer', group_id: customers.id, active: true

test_1  = Test.create! name: 'Test Eins',  description: 'Test Eins Description' active: true, user_id: ctmr_1.id
test_2  = Test.create! name: 'Test Zweig', description: 'Test Zweig Description' active: true, user_id: ctmr_1.id
test_3  = Test.create! name: 'Test Drei',  description: 'Test Drei Description' active: true, user_id: ctmr_1.id

question_1 = {
  user_id: ctmr_1.id, question: 'Question 11111', hint: 'Hint 111',explanation: 'Etwas Explanation 11', worth: 1, active: true, type:true
}

question_2 = {
  user_id: ctmr_1.id, question: 'Question 222', hint: 'Hint 222',explanation: 'Etwas Explanation 22', worth: 1, active: true, type:true
}

q1 = Question.create! question_1
q2 = Question.create! question_2

test_questions_1 = { test_id: test_1.id, question_id: q1.id,  order: 1 }

tq1 = TestQuestion.create! test_questions_1

test_questions_2 = { test_id: test_1.id, question_id: q2.id,  order: 1 }

tq1 = TestQuestion.create! test_questions_2

answer_1 = Answer.create! name: 'Totopo', age: 3, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_2.id, active: true

answer_1 = {
 
  question_id: owner_2.id
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

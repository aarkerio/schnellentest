# coding: utf-8
# Chipotle Software 2016-2017 (c)  MIT License

admin      = Group.create! name: 'Admin', description: 'Admin'
teachers   = Group.create! name: 'Teacher group', description: 'Teacher group'
students   = Group.create! name: 'Students group', description: 'Students group'
staff      = Group.create! name: 'staff', description: 'staff'

unless User.exists?(uname: 'admin')
  admin  = User.create! uname: 'admin', email: 'admin@example.com', password:'password', password_confirmation: 'password',fname: 'admin', lname: 'admin', group_id: admin.id, active: true
end

tchr_3 = User.create_with(uname: 'emily77',email:'emily@exale.com', password: 'password', password_confirmation: 'password', fname: 'Emily',lname:'Mayer', group_id: teachers.id, active: true).find_or_create_by(uname: 'emily77')
stud_2 = User.create_with(uname: 'rose79',email:'rose@exale.com',password:'password',password_confirmation: 'password',fname:'Rose',lname: 'Martinez',group_id: students.id, active: true).find_or_create_by(uname: 'rose79')
tchr_1 = User.create_with(uname: 'mmontoya', email:'mmontoya@exale.com', password: 'password', password_confirmation:'password',fname: 'Manuel',lname: 'Montoya', group_id: teachers.id, active: true).find_or_create_by(uname: 'mmontoya')

test_1  = Test.create! title: 'Test Eins Neerland gesichte',  description: 'Test Eins Description', active: true, user_id: tchr_1.id
test_2  = Test.create! title: 'Test Zweig Mexikan Neerland gesichte', description: 'Test Zweig Description', active: true, user_id: tchr_1.id
test_3  = Test.create! title: 'Test Drei brasilianische Wirtschaft',  description: 'Test Drei Description', active: true, user_id: tchr_1.id

ipsum = %(Lorem ipsum dolor sit amet consetetur sadipscing elitr)
question_1 = { user_id: tchr_1.id, question: ipsum, hint: ipsum, explanation: ipsum, tags: ipsum, worth: 1, active: true, qtype: 1 }
question_2 = { user_id: tchr_1.id, question: ipsum, hint: ipsum, explanation: ipsum, tags: ipsum, worth: 1, active: true, qtype: 1 }
question_3 = { user_id: tchr_1.id, question: ipsum, hint: ipsum, explanation: ipsum, tags: ipsum, worth: 1, active: true, qtype: 1 }

q1 = Question.create! question_1
q2 = Question.create! question_2
q3 = Question.create! question_3

tq1 = QuestionTest.create! test_id: test_1.id, question_id: q1.id
tq2 = QuestionTest.create! test_id: test_1.id, question_id: q2.id
tq3 = QuestionTest.create! test_id: test_1.id, question_id: q3.id

answer_1 = Answer.create! answer: 'This is the Answer 1111', correct: true,  question_id: q1.id
answer_2 = Answer.create! answer: 'This is the Answer 222', correct: true,  question_id: q1.id
answer_3 = Answer.create! answer: 'This is the Answer 222', correct: true,  question_id: q1.id

(1..46).each do |i|
  ipsum = FFaker::BaconIpsum.sentence
  Question.create! user_id: tchr_1.id, question: ipsum, hint: ipsum, explanation: ipsum, tags: ipsum, worth: 1, active: true, qtype:true
end

# Composite question

composite_question_1 = { user_id: tchr_1.id, question: ipsum, hint: ipsum, explanation: ipsum, tags: ipsum, worth: 1, active: true, qtype: 5 }

composite_answer_1 = CompositeAnswer.create!  first_column: 'México',    second_column: 'Buenos Aires', correct_column: 'B', name_column: 'A', question_id: composite_question_1
composite_answer_2 = CompositeAnswer.create!  first_column: 'Colombia',  second_column: 'CDMX',         correct_column: 'D', name_column: 'B', question_id: composite_question_1
composite_answer_3 = CompositeAnswer.create!  first_column: 'Argentina', second_column: 'Montevideo',   correct_column: 'A', name_column: 'C', question_id: composite_question_1
composite_answer_4 = CompositeAnswer.create!  first_column: 'Uruguay',   second_column: 'Bógota',       correct_column: 'C', name_column: 'D', question_id: composite_question_1

# Test
# app.get '/'
# token = app.session[:_csrf_token]
# app.post '/users/sign_in/', params: {email: 'admin@example.com', password: 'password'}, headers: {'X-CSRF-Token' => token}

# coding: utf-8
# Chipotle Software 2016-2020 (c)  MIT License

admin      = Group.create! name: 'Admin', description: 'Admin'
teachers   = Group.create! name: 'Teacher group', description: 'Teacher group'
students   = Group.create! name: 'Students group', description: 'Students group'
staff      = Group.create! name: 'staff', description: 'staff'

subjects = %w[Math English Spanish Geography Art Music History Chemistry Physics Biology Geometry Science Politics Philosophy Physical Education Literature 'Computer Sciences']

subjects.each {|s| Subject.create!(subject: s) }

ipsum = %(Lorem ipsum dolor sit amet consetetur sadipscing elitr doloret seum entia praeter necesitatem non sun multiplicanda)

unless User.exists?(uname: 'admin')
  admin  = User.create! uname: 'admin', email: 'admin@example.com', password:'password', password_confirmation: 'password',fname: 'admin', lname: 'admin', group_id: admin.id, active: true
end

tchr_3 = User.create_with(uname: 'emily77',email:'emily@exale.com', password: 'password', password_confirmation: 'password', fname: 'Emily',lname:'Mayer', group_id: teachers.id, active: true).find_or_create_by(uname: 'emily77')
stud_2 = User.create_with(uname: 'rose79',email:'rose@exale.com',password:'password',password_confirmation: 'password',fname:'Rose',lname: 'Martinez',group_id: students.id, active: true).find_or_create_by(uname: 'rose79')
tchr_1 = User.create_with(uname: 'mmontoya', email:'mmontoya@exale.com', password: 'password', password_confirmation:'password',fname: 'Manuel',lname: 'Montoya', group_id: teachers.id, active: true).find_or_create_by(uname: 'mmontoya')

subjects.each {|s| Post.create!(title: s, body: ipsum, user_id: 1, published: true) }

test_1  = Test.create! title: 'Test Eins Neerland gesichte',  description: 'Test Eins Description', active: true, user_id: tchr_1.id, subject_id: rand(1...subjects.count)
test_2  = Test.create! title: 'Test Zweig Mexikan Neerland gesichte', description: 'Test Zweig Description', active: true, user_id: tchr_1.id, subject_id: rand(1...subjects.count)
test_3  = Test.create! title: 'Test Drei brasilianische Wirtschaft',  description: 'Test Drei Description', active: true, user_id: tchr_1.id, subject_id: rand(1...subjects.count)

question_1 = Question.create! user_id: tchr_1.id, question: ipsum, hint: ipsum, explanation: ipsum, tags: ipsum, points: 1, active: true, qtype: 1
question_2 = Question.create! user_id: tchr_1.id, question: ipsum, hint: ipsum, explanation: ipsum, tags: ipsum, points: 1, active: true, qtype: 1
question_3 = Question.create! user_id: tchr_1.id, question: ipsum, hint: ipsum, explanation: ipsum, tags: ipsum, points: 1, active: true, qtype: 1

tq1 = test_1.question_tests.create! question: question_1
tq2 = test_1.question_tests.create! question: question_2
tq3 = test_1.question_tests.create! question: question_3

answer_1 = question_1.answer.create! answer: 'This is the Answer 1111', correct: true
answer_2 = question_1.answer.create! answer: 'This is the Answer 222', correct: false
answer_3 = question_1.answer.create! answer: 'This is the Answer 3333', correct: true

# (1..46).each do |i|
#   ipsum = FFaker::BaconIpsum.sentence
#   Question.create! user: tchr_1, question: ipsum, hint: ipsum, explanation: ipsum, tags: ipsum, worth: 1, active: true, qtype:true
# end

# # Composite question, a.k.a. related columns

# composite_question_1 = { user_id: tchr_1.id, question: ipsum, hint: ipsum, explanation: ipsum, tags: ipsum, worth: 1, active: true, qtype: 5 }

# composite_answer_1 = CompositeAnswer.create!  first_column: 'México',    second_column: 'Buenos Aires', correct_column: 'B', name_column: 'A', question_id: composite_question_1
# composite_answer_2 = CompositeAnswer.create!  first_column: 'Colombia',  second_column: 'CDMX',         correct_column: 'D', name_column: 'B', question_id: composite_question_1
# composite_answer_3 = CompositeAnswer.create!  first_column: 'Argentina', second_column: 'Montevideo',   correct_column: 'A', name_column: 'C', question_id: composite_question_1
# composite_answer_4 = CompositeAnswer.create!  first_column: 'Uruguay',   second_column: 'Bógota',       correct_column: 'C', name_column: 'D', question_id: composite_question_1

# Test
# app.get '/'
# token = app.session[:_csrf_token]
# app.post '/users/sign_in/', params: {email: 'admin@example.com', password: 'password'}, headers: {'X-CSRF-Token' => token}

# User.find_by(email: 'admin@example.com').reset_password!('password','password')

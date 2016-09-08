# Chipotle Software 2016 (c)  MIT License 

admin      = Group.create! name: 'Admin', description: 'Admin'
teachers   = Group.create! name: 'Teacher group', description: 'Teacher group'
students   = Group.create! name: 'Students group', description: 'Students group'
staff      = Group.create! name: 'staff', description: 'staff'

unless User.exists?(uname: 'admin')
  admin  = User.create! uname: "admin", email: "admin@example.com", password: 'password', fname: 'admin', lname: 'admin', group_id: admin.id, active: true
end

tchr_1 = User.create! uname: "emily77", email: 'emily@exale.com', password: 'password', fname: 'Emily',lname: 'Mayer', group_id: teachers.id, active: true
stud_1 = User.create! uname: "rose79", email: 'rose@exale.com', password: 'password', fname: 'Rose',lname: 'Martinez', group_id: students.id, active: true

test_1  = Test.create! title: 'Test Eins Neerland gesichte',  description: 'Test Eins Description', active: true, user_id: tchr_1.id
test_2  = Test.create! title: 'Test Zweig Mexikan Neerland gesichte', description: 'Test Zweig Description', active: true, user_id: tchr_1.id
test_3  = Test.create! title: 'Test Drei brasilianische Wirtschaft',  description: 'Test Drei Description', active: true, user_id: tchr_1.id

question_1 = {
  user_id: tchr_1.id, question: 'Question 11111', hint: 'Hint 111',explanation: 'Etwas Explanation 11', worth: 1, active: true, qtype:true
}

question_2 = {
  user_id: tchr_1.id, question: 'Question 222', hint: 'Hint 222',explanation: 'Etwas Explanation 22', worth: 1, active: true, qtype:true
}

q1 = Question.create! question_1
q2 = Question.create! question_2

tq1 = TestQuestion.create! test_id: test_1.id, question_id: q1.id, order: 1
tq2 = TestQuestion.create! test_id: test_1.id, question_id: q2.id, order: 2

answer_1 = { 
  answer: 'This is the Answer 111',  
  correct: true, 
  question_id: q1.id
}

answer_1 = Answer.create! answer_1


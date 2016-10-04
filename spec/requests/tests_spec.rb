require 'spec_helper'

RSpec.describe "/api/v1/tests", type: :request do

  before(:all) do
    Answer.delete_all
    TestQuestion.delete_all
    Question.delete_all
  end

  describe "POST /listing/" do
    it ".returns all the tests" do
      user = FactoryGirl.create :user
      test1 = FactoryGirl.create :test, title: "Math test", user: user
      test2 = FactoryGirl.create :test, title: "Other Math test", user: user
      post "/api/v1/tests/listing", params: {user_id: user.id, active: true}, headers: { "Accept" => "application/json" },  as: :json

      json = JSON.parse(response.body)
      # puts "response >>>  #{json.second} "  
      expect(json.length).to eq(2)
      expect(response.status).to eq 200
      expect(json.second['title']).to match("Other Math test")
    end
  end

  describe "POST /get_one/" do
    it ".returns one test" do
      test = FactoryGirl.create :test, title: "Summerian test"

      post "/api/v1/tests/get_one", params: {id: test.id}, headers: { "Accept" => "application/json" },  as: :json

      #puts "response  #{response.body.inspect} "
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(json['title']).to match("Summerian test")
    end
  end

  describe "POST /create/" do
    it ".creates a test" do
      user = FactoryGirl.create :user
      test = FactoryGirl.attributes_for :test 
      post "/api/v1/tests/create", params: test, headers: { "Accept" => "application/json" },  as: :json

      json = JSON.parse(response.body)
      #puts "response >>>  #{json} "
      expect(response.status).to eq 200
      expect(json['error']).to match(false)
    end
    it ".not creates a tests" do
      user = FactoryGirl.create :user
      test = FactoryGirl.attributes_for :test, title: nil 
      post "/api/v1/tests/create", params: test, headers: { "Accept" => "application/json" },  as: :json

      json = JSON.parse(response.body)
      #puts "response >>>  #{json} "
      expect(response.status).to eq 200
      expect(json['error']).to match(true)
    end
  end

  describe "POST /create/" do
    it ".updates a test" do
      fail "needs flamethrower : not yet done" 
      user = FactoryGirl.create :user
      test = FactoryGirl.attributes_for :test 
      post "/api/v1/tests/create", params: test, headers: { "Accept" => "application/json" },  as: :json

      json = JSON.parse(response.body)
      #puts "response >>>  #{json} "
      expect(response.status).to eq 200
      expect(json['error']).to match(false)
    end
 end

  describe "POST /search/" do
    it ".search for questions not already in the test" do
      lexem      = 'Argentina'
      user       = FactoryGirl.create :user
      test       = FactoryGirl.create :test, user: user
      question1  = FactoryGirl.create :question, question: "#{lexem} History"
      test_quest = FactoryGirl.create :test_question, test: test, question: question1
      question2  = FactoryGirl.create :question, question: "#{lexem} Geography"
      question3  = FactoryGirl.create :question, question: "Capitals from #{lexem}"
 
      post "/api/v1/tests/search", params: {id: test.id, terms: lexem}, headers: { "Accept" => "application/json" },  as: :json

      json = JSON.parse(response.body)
      # puts "response >>>  #{json}"
      expect(response.status).to eq 200
      expect(json.length).to eq 2
      expect(json.second['question']).to match("#{lexem} Geography")
    end
  end

  describe "POST /linking/" do
    it ".link questions with the current test" do
      user       = FactoryGirl.create :user
      test       = FactoryGirl.create :test, user: user
      question1  = FactoryGirl.create :question
      test_quest = FactoryGirl.create :test_question, test: test, question: question1
      question2  = FactoryGirl.create :question
      question3  = FactoryGirl.create :question
 
      post "/api/v1/tests/linking", params: {id: test.id, question_ids: [question2, question3]}, headers: { "Accept" => "application/json" },  as: :json

      json = JSON.parse(response.body)
      # puts "response >>>  #{json}"
      expect(response.status).to eq 200
      expect(json['error']).to eq false
    end
  end

  describe "DELETE /delete/" do
    it ".destroy one tests" do
      user = FactoryGirl.create :user
      test1 = FactoryGirl.create :test, title: "Math test", user: user
      test2 = FactoryGirl.create :test, title: "Other Math test", user: user
      delete "/api/v1/tests/delete/#{test2.id}", params: {}, headers: { "Accept" => "application/json" },  as: :json

      json = JSON.parse(response.body)
      # puts "response >>>  #{json} "
      expect(response.status).to eq 200
      expect(json['error']).to match(false)
    end
  end

end


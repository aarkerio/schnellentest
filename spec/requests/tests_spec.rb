require 'spec_helper'

RSpec.describe '/api/v1/tests', type: :request do
  before(:each) do
    Answer.delete_all
    TestQuestion.delete_all
    Question.delete_all
  end

  describe 'POST /listing/' do
    it '.returns all the tests' do
      user = FactoryGirl.create :user
      FactoryGirl.create :test, title: 'Math test', user: user
      FactoryGirl.create :test, title: 'Other Math test', user: user
      post '/api/v1/tests/listing', params: { user_id: user.id, active: true },
                                    headers: { 'Accept' => 'application/json' },  as: :json

      json = JSON.parse(response.body)
      expect(json.length).to eq(2)
      expect(response.status).to eq 200
      expect(json.second['title']).to match('Other Math test')
    end
  end

  describe 'POST /get_one/' do
    it '.returns one test' do
      test = FactoryGirl.create :test, title: 'Summerian test'

      post '/api/v1/tests/get_one', params: { id: test.id },
                                    headers: { 'Accept' => 'application/json' }, as: :json
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(json['title']).to match('Summerian test')
    end
  end

  describe 'POST /create/' do
    it '.creates a test' do
      user = FactoryGirl.create :user
      test = FactoryGirl.attributes_for :test
      post '/api/v1/tests/create', params: test, headers: { 'Accept' => 'application/json' },  as: :json

      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['error']).to match(false)
    end
    it '.not creates a tests' do
      user = FactoryGirl.create :user
      test = FactoryGirl.attributes_for :test, title: nil
      post '/api/v1/tests/create', params: test,
                                   headers: { 'Accept' => 'application/json' }, as: :json

      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['error']).to match(true)
    end
  end

  describe 'PATCH /update/' do
    it '.updates a test' do
      user = FactoryGirl.create :user
      test = FactoryGirl.create :test, user: user
      patch '/api/v1/tests/update', params: { id: test.id },
                                    headers: { 'Accept' => 'application/json' }, as: :json

      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['error']).to match(false)
    end
 end

  describe 'POST /search/' do
    it '.search for questions not already in the test' do
      lexem      = 'Argentina'
      user       = FactoryGirl.create :user
      test       = FactoryGirl.create :test, user: user
      question1  = FactoryGirl.create :question, question: "#{lexem} History"
      FactoryGirl.create :test_question, test: test, question: question1
      FactoryGirl.create :question, question: "#{lexem} Geography"
      FactoryGirl.create :question, question: "Capitals from #{lexem}"

      post '/api/v1/tests/search', params: { id: test.id, test: {id: test.id, terms: lexem} },
                                   headers: { 'Accept' => 'application/json' }, as: :json

      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json.length).to eq 2
      expect(json.second['question']).to match("Capitals from #{lexem}")
    end
  end

  describe 'POST /linking/' do
    it '.link questions with the current test' do
      user       = FactoryGirl.create :user
      test       = FactoryGirl.create :test, user: user
      question_1  = FactoryGirl.create :question
      test_quest = FactoryGirl.create :test_question, test: test, question: question_1
      question_2  = FactoryGirl.create :question
      question_3  = FactoryGirl.create :question

      post '/api/v1/tests/linking', params: { id: test.id, question_ids: [question_2, question_3]},
                                    headers: { 'Accept' => 'application/json' }, as: :json

      json = JSON.parse(response.body)
      # puts "response >>>  #{json}"
      expect(response.status).to eq 200
      expect(json['error']).to eq false
    end
  end

  describe 'PATCH /reorder/' do
    it '.link questions with the current test' do
      user        = FactoryGirl.create :user
      test        = FactoryGirl.create :test, user: user
      question_1   = FactoryGirl.create :question
      question_2   = FactoryGirl.create :question
      question_3   = FactoryGirl.create :question
      FactoryGirl.create :test_question, test: test, question: question_1, order: 1
      FactoryGirl.create :test_question, test: test, question: question_2, order: 2
      FactoryGirl.create :test_question, test: test, question: question_3, order: 3

      patch '/api/v1/tests/reorder', params: { id: test.id, test:{question_id: question_1.id, id: test.id, way: 'down' }},
                                     headers: { 'Accept' => 'application/json' }, as: :json

      json = JSON.parse(response.body)
      # puts "response >>>  #{json}"
      expect(json['error']).to eq false
    end
  end

  describe 'DELETE /delete/' do
    it '.destroy one tests' do
      user = FactoryGirl.create :user
      test_1 = FactoryGirl.create :test, title: 'Math test', user: user
      test_2 = FactoryGirl.create :test, title: 'Other Math test', user: user
      delete "/api/v1/tests/delete/#{test_2.id}", params: {},
                                                  headers: { 'Accept' => 'application/json' }, as: :json

      json = JSON.parse(response.body)
      # puts "response >>>  #{json} "
      expect(response.status).to eq 200
      expect(json['error']).to match(false)
    end
  end
end

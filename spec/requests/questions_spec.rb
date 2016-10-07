require 'spec_helper'

RSpec.describe '/api/v1/questions', type: :request do
  before(:each) do
    Answer.delete_all
    QuestionQuestion.delete_all
    Question.delete_all
  end

  describe 'POST /listing/' do
    it '.returns all the questions' do
      user = FactoryGirl.create :user
      FactoryGirl.create :question, title: 'Math question', user: user
      FactoryGirl.create :question, title: 'Other Math question', user: user
      post '/api/v1/questions/listing', params: { user_id: user.id, active: true },
                                    headers: { 'Accept' => 'application/json' },  as: :json

      json = JSON.parse(response.body)
      expect(json.length).to eq(2)
      expect(response.status).to eq 200
      expect(json.second['title']).to match('Other Math question')
    end
  end

  describe 'POST /get_one/' do
    it '.returns one question' do
      question = FactoryGirl.create :question, title: 'Summerian question'

      post '/api/v1/questions/get_one', params: { id: question.id },
                                    headers: { 'Accept' => 'application/json' }, as: :json
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(json['title']).to match('Summerian question')
    end
  end

  describe 'POST /create/' do
    it '.creates a question' do
      user = FactoryGirl.create :user
      question = FactoryGirl.attributes_for :question
      post '/api/v1/questions/create', params: question, headers: { 'Accept' => 'application/json' },  as: :json

      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['error']).to match(false)
    end
    it '.not creates a questions' do
      user = FactoryGirl.create :user
      question = FactoryGirl.attributes_for :question, title: nil
      post '/api/v1/questions/create', params: question,
                                   headers: { 'Accept' => 'application/json' }, as: :json

      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['error']).to match(true)
    end
  end

  describe 'PATCH /update/' do
    it '.updates a question' do
      user = FactoryGirl.create :user
      question = FactoryGirl.create :question, user: user
      patch '/api/v1/questions/update', params: { id: question.id },
                                    headers: { 'Accept' => 'application/json' }, as: :json

      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['error']).to match(false)
    end
 end

  describe 'POST /search/' do
    it '.search for questions not already in the question' do
      lexem      = 'Argentina'
      user       = FactoryGirl.create :user
      question       = FactoryGirl.create :question, user: user
      question1  = FactoryGirl.create :question, question: "#{lexem} History"
      FactoryGirl.create :question_question, question: question, question: question1
      FactoryGirl.create :question, question: "#{lexem} Geography"
      FactoryGirl.create :question, question: "Capitals from #{lexem}"

      post '/api/v1/questions/search', params: { id: question.id, question: {id: question.id, terms: lexem} },
                                   headers: { 'Accept' => 'application/json' }, as: :json

      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json.length).to eq 2
      expect(json.second['question']).to match("Capitals from #{lexem}")
    end
  end

  describe 'POST /linking/' do
    it '.link questions with the current question' do
      user       = FactoryGirl.create :user
      question       = FactoryGirl.create :question, user: user
      question_1  = FactoryGirl.create :question
      question_quest = FactoryGirl.create :question_question, question: question, question: question_1
      question_2  = FactoryGirl.create :question
      question_3  = FactoryGirl.create :question

      post '/api/v1/questions/linking', params: { id: question.id, question_ids: [question_2, question_3]},
                                    headers: { 'Accept' => 'application/json' }, as: :json

      json = JSON.parse(response.body)
      # puts "response >>>  #{json}"
      expect(response.status).to eq 200
      expect(json['error']).to eq false
    end
  end

  describe 'PATCH /reorder/' do
    it '.link questions with the current question' do
      user        = FactoryGirl.create :user
      question        = FactoryGirl.create :question, user: user
      question_1   = FactoryGirl.create :question
      question_2   = FactoryGirl.create :question
      question_3   = FactoryGirl.create :question
      FactoryGirl.create :question_question, question: question, question: question_1, order: 1
      FactoryGirl.create :question_question, question: question, question: question_2, order: 2
      FactoryGirl.create :question_question, question: question, question: question_3, order: 3

      patch '/api/v1/questions/reorder', params: { id: question.id, question:{question_id: question_1.id, id: question.id, way: 'down' }},
                                     headers: { 'Accept' => 'application/json' }, as: :json

      json = JSON.parse(response.body)
      # puts "response >>>  #{json}"
      expect(json['error']).to eq false
    end
  end

  describe 'DELETE /delete/' do
    it '.destroy one questions' do
      user = FactoryGirl.create :user
      question_1 = FactoryGirl.create :question, title: 'Math question', user: user
      question_2 = FactoryGirl.create :question, title: 'Other Math question', user: user
      delete "/api/v1/questions/delete/#{question_2.id}", params: {},
                                                  headers: { 'Accept' => 'application/json' }, as: :json

      json = JSON.parse(response.body)
      # puts "response >>>  #{json} "
      expect(response.status).to eq 200
      expect(json['error']).to match(false)
    end
  end
end

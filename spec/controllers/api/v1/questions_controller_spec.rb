require 'spec_helper'

RSpec.describe Api::V1::QuestionsController, type: :controller do
  
  before do
    user = FactoryGirl.create :user
    test = FactoryGirl.create_list :test, 5, user: user
    question = FactoryGirl.create :question, test: test
    answers = FactoryGirl.create_list :question, 5, question: questions 
  end

  describe "POST#get_one" do
    it "returns a successful 200 response" do
      post :get_one, {id: @question.id}
      expect(response).to be_success
      # puts "response  #{response.body.inspect} "
      json = JSON.parse(response.body)
      expect(json.length).to eq(5)
    end
  end

  describe "POST#create" do
    it "returns a successful 200 response" do
      post :create, {answer: {answer: 'Answer', active: true, correct: true, question_id: @question.id}}
      expect(response).to be_success
      puts "response  #{response.body.inspect} "
      json = JSON.parse(response.body)
      expect(json.length).to eq(5)
    end
  end
end

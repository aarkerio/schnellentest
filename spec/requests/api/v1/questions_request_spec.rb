require 'spec_helper'

RSpec.describe Api::V1::QuestionsController, type: :controller do
  
  before(:each) do
    group       = FactoryGirl.create :group
    @user       = FactoryGirl.create :user, group: group
    tests       = FactoryGirl.create_list :test, 5, user: @user
    @test       = tests.first
    @question   = FactoryGirl.create :question, user: @user
    test_quest = FactoryGirl.create :test_question, test: @test, question: @question
    answers     = FactoryGirl.create_list :answer, 5, question: @question 
  end
  
  describe "POST#get_one" do
    it "returns a successful listing response" do
      post :get_one, {params: {id: @question.id}}
      expect(response).to be_success
      json = JSON.parse(response.body)
      # puts "response  #{response.body.inspect} "
      expect(json['answers'].length).to eq(5)
    end
  end

  describe "POST#create" do
    let(:question) { FactoryGirl.attributes_for :question, user: @user }
    it "returns a successful save response" do
      question['test_id'] = @test.id
      post :create, {params: {question: question}}
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['message'][0..7]).to eq('Question')
    end
  end

  describe "DELETE#delete" do
    it "returns a successful remove response" do
      delete :delete, {params: {id: @question.id, test_id: @test.id}}
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['message'][0..7]).to eq('Question')
    end
  end

end

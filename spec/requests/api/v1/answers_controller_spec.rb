require 'spec_helper'

RSpec.describe Api::V1::AnswersController, type: :controller do
  
  before(:each) do
    group      = FactoryGirl.create :group
    @user      = FactoryGirl.create :user, group: group
    tests      = FactoryGirl.create_list :test, 5, user: @user
    @test      = tests.first
    @question  = FactoryGirl.create :question, user: @user
    test_quest = FactoryGirl.create :test_question, test: tests.first, question: @question
    answers    = FactoryGirl.create_list :answer, 5, question: @question 
  end

  describe "POST#create" do
    let(:answer){ FactoryGirl.attributes_for :answer, question: @question }
    it "returns a successful 200 response" do
      post :create, {params: {answer: answer }}
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['message'][0..5]).to eq('Answer')
    end
  end

end

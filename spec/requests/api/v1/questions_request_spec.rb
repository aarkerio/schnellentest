require 'spec_helper'

RSpec.describe Api::V1::QuestionsController, type: :request do

  let(:group)      { FactoryBot.create :group }
  let(:user)       { FactoryBot.create :user, group: group }
  let(:test)       { FactoryBot.create :test, user: user}
  let(:question)   { FactoryBot.create :question, user: user }
  let(:quest_test) { FactoryBot.create :question_tests, test: test, question: question }
  let!(:answers)   { FactoryBot.create_list :answer, 5, question: question }

  describe "POST#get_one" do
    it "returns a successful listing response" do
      post api_v1_questions_get_one_path, {params: {id: question.id}}
      expect(response).to be_success
      json = JSON.parse(response.body)
      # puts "response  #{response.body.inspect} "
      expect(json['answers'].length).to eq(5)
    end
  end

  describe "POST#create" do
    let(:question_1) { FactoryBot.attributes_for :question, user: user }
    it "returns a successful save response" do
      question_1['test_id'] = test.id
      question_1['user_id'] = user.id
      post api_v1_questions_create_path, {params: {question: question_1}}
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['message'][0..7]).to eq('Question')
    end
  end

  describe "DELETE#delete" do
    let(:quest_test_1) { FactoryBot.create :question_tests, test: test, question: question }
    it "returns a successful remove response" do
      delete api_v1_questions_delete_path, {params: {id: quest_test_1.question_id, test_id: quest_test_1.test_id}}
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['message'][0..7]).to eq('Question')
    end
  end

end


require 'spec_helper'

RSpec.describe Api::V1::TestsController, type: :request do

  let(:user)  { FactoryGirl.create :user }
  let(:tests) { FactoryGirl.create_list :test, 5, user: user }

  describe "POST#listing" do
    it "returns a successful 200 response for listing action" do
      new_user  = user
      new_tests = tests
      post api_v1_tests_listing_path, {params: {test: {user_id: user.id, active: true}}}
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json.length).to eq(5)
    end
  end

  describe "POST#get_one" do
    let(:test)      { FactoryGirl.create :test, user: user }
    it "returns a successful 200 response for get_one action" do
      post api_v1_tests_get_one_path, {params: {id: test.id}}
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['title']).to eq(test.title)
    end
  end

  describe "PATCH#reorder" do
    let(:test)  { FactoryGirl.create :test, user: user }
    let(:question_1) { FactoryGirl.create :question, question: 'Frage Eins' }
    let(:question_2) { FactoryGirl.create :question, question: 'Frage Zweig' }
    let(:question_3) { FactoryGirl.create :question, question: 'Frage Drei' }
    let(:test_question) { FactoryGirl.create :test_question, test: test.id, question: [question_1.id, question_2.id, question_3.id,] }
    it "returns a successful 200 response for reorder action" do
      patch api_v1_tests_reorder_path, {params: {test: {id: test.id}}}

      {id: test.id, test:{
                       question_id: question_id,
                       id: test.id,
                       way: 'up' }}
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['title']).to eq(test.title)
    end
  end

end
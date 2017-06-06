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
    let(:test)             { FactoryGirl.create :test, user: user }
    let(:question_test_1)  { FactoryGirl.create :question_with_test, question: 'Frage Eins',  user: user, test: test }
    let(:question_test_2)  { FactoryGirl.create :question_with_test, question: 'Frage Zweig', user: user, test: test }
    let(:question_test_3)  { FactoryGirl.create :question_with_test, question: 'Frage Drei',  user: user, test: test }
    it "move the question up and successful 200" do
      question_test_1
      question_test_2
      question_test_3
      qt = test.question_tests.where( question_id: question_test_2.id).first
      start_order = qt.order.to_i
      patch api_v1_tests_reorder_path, {params: {id: test.id, test:{
                                                 question_id: question_test_2.id,
                                                 way: 'up' }} }
      finish_order = qt.reload.order.to_i
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['message']).to eq('Question was sorted succesfully')
      expect(start_order).to be < finish_order
    end

    it "move the question down and successful 200" do
      question_test_1
      question_test_2
      question_test_3
      qt = test.question_tests.where( question_id: question_test_2.id).first
      start_order = qt.order.to_i
      patch api_v1_tests_reorder_path, {params: {id: test.id, test:{
                                                 question_id: question_test_2.id,
                                                 way: 'down' }} }
      finish_order = qt.reload.order.to_i
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['message']).to eq('Question was sorted succesfully')
      expect(start_order).to be < finish_order
    end
  end

end

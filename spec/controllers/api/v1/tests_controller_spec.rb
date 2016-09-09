require 'spec_helper'

RSpec.describe Api::V1::TestsController, type: :controller do
  
  before do
    @user = FactoryGirl.create :user
    test = FactoryGirl.create_list :test, 5, user: @user
  end
   
  describe "POST#listing" do
    it "returns a successful 200 response" do
      post :listing, {params: {test: {user_id: @user.id, active: true}}}
      expect(response).to be_success
      # puts "response  #{response.body.inspect} "
      json = JSON.parse(response.body)
      expect(json.length).to eq(5)
    end
  end

end

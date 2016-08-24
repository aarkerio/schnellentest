
RSpec.describe "Appointments", type: :request do

  before :each do
    @user = FactoryGirl.create :user
  end

  describe "POST /appointments/get_data" do
    it "returns a json response" do
      params = {ovalue: 'M'}
      post '/appointments/get_data', params
      expect(response).to have_http_status(200)
    end
  end
end

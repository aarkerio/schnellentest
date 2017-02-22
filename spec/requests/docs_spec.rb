require 'rails_helper'

RSpec.describe "Docs", type: :request do
  describe "GET /docs" do
    it "works! (now write some real specs)" do
      get docs_path
      expect(response).to have_http_status(200)
    end
  end
end

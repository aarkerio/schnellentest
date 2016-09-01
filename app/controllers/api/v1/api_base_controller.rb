require 'chipotle/v1/error_handling'

module Api
module V1
  class ApiBaseController < ::ApplicationController
    
    skip_before_action :verify_authenticity_token

    # before_action :connect_customer   if Rails.env != 'test'
    #layout false

    private

    # Private: Switch customer database.
    #
    #
    # Returns database object.
    def connect_customer
      # Chipotle::V1::Database::DbConnect.connect_customer(@customer)
    end

    def parse_request
      @json = JSON.parse(request.body.read)
    end

    def render_error(error)
      render(json: error, status: error.status)
    end
  end
end
end

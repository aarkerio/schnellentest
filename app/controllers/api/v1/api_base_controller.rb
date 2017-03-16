# Chipotle Software (c) 2016-2017  MIT License
module Api
module V1
  class ApiBaseController < ::ActionController::Base

    # include Chipotle::API::V1::ErrorSerializer
    # before_action :authenticate_user_from_token!

    protect_from_forgery with: :null_session

    # before_action :connect_customer   if Rails.env != 'test'

    # before_action :authenticate_user_from_token!

    layout false

    ##
    # User Authentication
    # Authenticates the user with guid and token
    def authenticate_user_from_token!
      auth_token = params['auth_token']
      guid       = params['guid']
      if auth_token && guid
        authenticate_with_auth_token auth_token, guid
      else
        render json: {error: 'unauthorized'}, status: 401
      end
    end

    private

    # Private: Switch customer database.
    #
    #
    # Returns database object.
    def authenticate_with_auth_token auth_token, guid

      user = User.where(guid: guid).first

      if user.guid == guid && user.token == auth_token
        true
      else
        render json: {error: 'unauthorized'}, status: 401
      end
    end

    def parse_request
      @json = JSON.parse(request.body.read)
    end

    def render_error(error)
      render(json: error, status: error.status)
    end

  end # class ends
end
end

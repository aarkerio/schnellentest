module Api
module V1
  class AuthController  < ::ActionController::Base
   
  # Public.
  # Returns: JWT response or error message
  def authenticate
    user = User.find_by_guid_and_token(params[:guid], params[:token])  # object or nil
    if user
      render json: authentication_payload(user)
    else
      render json: { errors: ['Invalid guid or token'] }, status: :unauthorized
    end
  end

  private

  def authentication_payload(user)
    return nil unless user && user.id
    {
      auth_token: AuthToken.encode({ user_id: id }),
      user: { id: user.id, username: user.uname, email: user.email}  # return whatever user info you need
    }
  end
end # class ends

end
end

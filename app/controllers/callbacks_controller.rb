class CallbacksController < Devise::OmniauthCallbacksController

  def facebook_two
    @user = User.find_for_facebook_oauth(request.env["omniauth.auth"],
                                         current_user)
    if @user.persisted?
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success",
        :kind => "Facebook"
      sign_in @user, :event => :authentication
      if request.format.json?
        render json: {status: 'success', hasCellPhone: !@user.mobile_phone.nil?}
      else
        render 'callback', :layout => "appointments"
      end
    else
      auth_data = request.env["omniauth.auth"].select { |k,v| k == "credentials" || k == "info" || k == "uid" }
      session["devise.facebook_data"] = auth_data
      redirect_to new_user_registration_url
    end
  end

  def facebook
    omniauth = request.env["omniauth.auth"]
    authentication = Authentication.where(provider: omniauth['provider'], uid: omniauth['uid']).take

    if authentication
      flash[:notice] = "Logged in Successfully"
      sign_in_and_redirect User.find(authentication.user_id)
    elsif current_user
      token = omniauth['credentials'].token
      token_secret = omniauth['credentials'].has_key?('secret') ?  omniauth['credentials'].secret : nil

      current_user.authentications.create!(:provider => omniauth['provider'], :uid => omniauth['uid'], :token => token, :token_secret => token_secret)

      flash[:notice] = "Authentication successful."
      sign_in_and_redirect current_user
    else
      user = User.new
      user.apply_omniauth(omniauth)

      session['devise.omniauth'] = omniauth.except('extra')
      redirect_to new_user_registration_path
    end
  end

end

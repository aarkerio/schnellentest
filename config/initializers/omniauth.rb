
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, Rails.application.secrets['facebook_app_id'], Rails.application.secrets['facebook_app_secret'],
  scope: 'email,user_birthday,read_stream', display: 'popup', callback_url: "http://localhost:3000/users/auth/facebook/callback"
end


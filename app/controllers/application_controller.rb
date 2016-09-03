# GPLv3 Chipotle Software (c) 2016

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  #
  # 
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :null_session
  protect_from_forgery with: :exception

  skip_before_action :verify_authenticity_token, if: :devise_controller?

  before_action :configure_permitted_parameters, if: :devise_controller? 

  before_action :authenticate_user!, except: [:welcome, :about]
     
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:uname, :fname, :lname])
    devise_parameter_sanitizer.permit(:account_update, keys: [:uname, :fname, :lname])
  end
  
end

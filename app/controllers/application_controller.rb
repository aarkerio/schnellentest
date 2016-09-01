# GPLv3 Chipotle Software (c) 2016

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  #
  # 
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :null_session
  protect_from_forgery with: :exception

  before_action :authenticate_user!, except: [:welcome, :about]

end

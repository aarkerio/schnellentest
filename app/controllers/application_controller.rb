# GPLv3 Chipotle Software (c) 2016

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  #
  # 
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :null_session
  protect_from_forgery with: :exception
  #protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format.json? }
  # before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!, except: [:welcome, :about, :contact]
  #layout :layout_by_resource

  protected
    
  def layout_by_resource
    if devise_controller? && resource_name == :user && action_name == "new"
      "devise"
    else
      "application"
    end
  end
end

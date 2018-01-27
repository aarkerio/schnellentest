# GPLv3 Chipotle Software (c) 2016-2018

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  #
  #
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :layout_by_action

  @@actions = %w(new edit create update index elaboration)

  before_action :configure_permitted_parameters, if: :devise_controller?

  before_action :authenticate_user!, except: [:welcome, :about]

  rescue_from StandardError, with: :render_resource_error if Rails.env.production? || Rails.env.staging?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:uname, :fname, :lname])
    devise_parameter_sanitizer.permit(:account_update, keys: [:uname, :fname, :lname])
  end

  def render_resource_error(error)
    logger.error error.message
    logger.error error.backtrace.join("\n")

    notify_airbrake(error)
    render 'errors/internal_server_error', status: :internal_server_error
  end

  # Layout for action
  def layout_by_action
    if @@actions.include? params[:action]
      self.class.layout 'admin'
    else
      self.class.layout 'application'
    end
  end

end

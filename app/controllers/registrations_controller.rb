class RegistrationsController < Devise::RegistrationsController

  def create
    super
    session['devise.omniauth'] = nil unless @user.new_record?
  end

  def build_resource(*args)
    super
    if session['devise.omniauth']
      @user.apply_omniauth(session['devise.omniauth'])
      @user.valid?
    end
  end
end

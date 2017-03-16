# frozen_string_literal: true
# Module for authenticating users for features specs.
module  UserHelper

  def login(a)
    visit root_path
    click_link 'Log In'
    fill_in 'session[email]', with: a.email
    fill_in 'session[password]', with: a.password
    click_button 'Log In'
  end

  def logout(a)
    visit root_path
    click_link 'Log Out'
  end

  def activate(a)
    visit activate_path(:code => a.activation_code)
  end

end

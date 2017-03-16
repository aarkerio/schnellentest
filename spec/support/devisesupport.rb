# frozen_string_literal: true
# Module for authenticating users for request specs.
module ValidUserRequestHelper
  # Signs in a valid user
  def sign_in_as_admin
    admin = FactoryGirl.create(:admin)
    login_as(admin, scope: :user)
  end

  def sign_in_as_user
    admin = FactoryGirl.create(:user)
    login_as(@user, scope: :user)
  end
end

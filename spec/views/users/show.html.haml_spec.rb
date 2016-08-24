require 'rails_helper'

RSpec.describe "users/show", type: :view do
  before(:each) do
    @user = assign(:user, User.create!(
      :fname => "Fname",
      :lname => "Lname",
      :uname => "Uname",
      :passwd => "Passwd",
      :active => false,
      :group => nil
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Fname/)
    expect(rendered).to match(/Lname/)
    expect(rendered).to match(/Uname/)
    expect(rendered).to match(/Passwd/)
    expect(rendered).to match(/false/)
    expect(rendered).to match(//)
  end
end

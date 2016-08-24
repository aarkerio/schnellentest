require 'rails_helper'

RSpec.describe "users/index", type: :view do
  before(:each) do
    assign(:users, [
      User.create!(
        :fname => "Fname",
        :lname => "Lname",
        :uname => "Uname",
        :passwd => "Passwd",
        :active => false,
        :group => nil
      ),
      User.create!(
        :fname => "Fname",
        :lname => "Lname",
        :uname => "Uname",
        :passwd => "Passwd",
        :active => false,
        :group => nil
      )
    ])
  end

  it "renders a list of users" do
    render
    assert_select "tr>td", :text => "Fname".to_s, :count => 2
    assert_select "tr>td", :text => "Lname".to_s, :count => 2
    assert_select "tr>td", :text => "Uname".to_s, :count => 2
    assert_select "tr>td", :text => "Passwd".to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
    assert_select "tr>td", :text => nil.to_s, :count => 2
  end
end

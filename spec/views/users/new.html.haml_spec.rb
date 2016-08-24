require 'rails_helper'

RSpec.describe "users/new", type: :view do
  before(:each) do
    assign(:user, User.new(
      :fname => "MyString",
      :lname => "MyString",
      :uname => "MyString",
      :passwd => "MyString",
      :active => false,
      :group => nil
    ))
  end

  it "renders new user form" do
    render

    assert_select "form[action=?][method=?]", users_path, "post" do

      assert_select "input#user_fname[name=?]", "user[fname]"

      assert_select "input#user_lname[name=?]", "user[lname]"

      assert_select "input#user_uname[name=?]", "user[uname]"

      assert_select "input#user_passwd[name=?]", "user[passwd]"

      assert_select "input#user_active[name=?]", "user[active]"

      assert_select "input#user_group_id[name=?]", "user[group_id]"
    end
  end
end

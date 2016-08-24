require 'rails_helper'

RSpec.describe "users/edit", type: :view do
  before(:each) do
    @user = assign(:user, User.create!(
      :fname => "MyString",
      :lname => "MyString",
      :uname => "MyString",
      :passwd => "MyString",
      :active => false,
      :group => nil
    ))
  end

  it "renders the edit user form" do
    render

    assert_select "form[action=?][method=?]", user_path(@user), "post" do

      assert_select "input#user_fname[name=?]", "user[fname]"

      assert_select "input#user_lname[name=?]", "user[lname]"

      assert_select "input#user_uname[name=?]", "user[uname]"

      assert_select "input#user_passwd[name=?]", "user[passwd]"

      assert_select "input#user_active[name=?]", "user[active]"

      assert_select "input#user_group_id[name=?]", "user[group_id]"
    end
  end
end

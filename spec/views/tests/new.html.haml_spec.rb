require 'rails_helper'

RSpec.describe "tests/new", type: :view do
  before(:each) do
    assign(:test, Test.new(
      :user => nil,
      :title => "MyString",
      :description => "MyText",
      :active => false,
      :shared => false
    ))
  end

  it "renders new test form" do
    render

    assert_select "form[action=?][method=?]", tests_path, "post" do

      assert_select "input#test_user_id[name=?]", "test[user_id]"

      assert_select "input#test_title[name=?]", "test[title]"

      assert_select "textarea#test_description[name=?]", "test[description]"

      assert_select "input#test_active[name=?]", "test[active]"

      assert_select "input#test_shared[name=?]", "test[shared]"
    end
  end
end

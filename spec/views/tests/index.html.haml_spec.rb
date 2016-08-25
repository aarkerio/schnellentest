require 'rails_helper'

RSpec.describe "tests/index", type: :view do
  before(:each) do
    assign(:tests, [
      Test.create!(
        :user => nil,
        :title => "Title",
        :description => "MyText",
        :active => false,
        :shared => false
      ),
      Test.create!(
        :user => nil,
        :title => "Title",
        :description => "MyText",
        :active => false,
        :shared => false
      )
    ])
  end

  it "renders a list of tests" do
    render
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
  end
end

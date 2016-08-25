require 'rails_helper'

RSpec.describe "tests/show", type: :view do
  before(:each) do
    @test = assign(:test, Test.create!(
      :user => nil,
      :title => "Title",
      :description => "MyText",
      :active => false,
      :shared => false
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(//)
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/MyText/)
    expect(rendered).to match(/false/)
    expect(rendered).to match(/false/)
  end
end

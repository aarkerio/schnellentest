ENV['RAILS_ENV'] ||= 'test'
require 'simplecov'
SimpleCov.start 'rails' do
  add_group 'API Controllers' , 'app/controllers/api'
end
SimpleCov.coverage_dir('./spec/support/coverage')
require File.expand_path("../../config/environment", __FILE__)
require 'rails/all'
require 'rspec/rails'
require 'factory_girl_rails'
require 'ffaker'
require 'database_cleaner'

Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}

RSpec.configure do |config|
  config.mock_with :rspec
  config.color = true
  config.include Requests::JsonHelpers, type: :request

  config.include Devise::Test::ControllerHelpers, type: :controller
  config.include Devise::Test::ControllerHelpers, type: :view

  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:transaction)
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

end


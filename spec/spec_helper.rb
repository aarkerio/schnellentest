ENV['RAILS_ENV'] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rails/all'
require 'rspec/rails'
require 'factory_girl_rails'
require 'ffaker'
require 'database_cleaner'

Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}

RSpec.configure do |config|
  config.mock_with :rspec
  config.include Requests::JsonHelpers, type: :request

  config.before(:suite) do
    DatabaseCleaner.strategy = :truncation, {:only => %w[annals]}
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

end


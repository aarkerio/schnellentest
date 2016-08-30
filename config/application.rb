require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Schnell
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Make sure devise accepts json requests.
    # DeviseController.respond_to :html, :json

    # turn off generators 
    config.generators do |g|
      g.stylesheets = false
      g.javascripts = false
      g.template_engine nil #to skip views
      g.test_framework  nil #to skip test framework
      g.helper = false
      g.view = false
      g.routing_specs = false
      g.view_specs = false
      g.helper_specs = false
      g.javascript_engine :js
      g.test_framework  :rspec, fixture: false
      g.template_engine :haml
      g.fixture_replacement :factory_girl, dir: 'spec/factories'
    end
  end
end

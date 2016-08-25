module Chipotle
  module V1
    module Database
        class DbConnect
          include ActiveModel::Validations
          include ActiveModel::Conversion
          extend ActiveModel::Naming

          def self.connect_customer(customer)
            EstablishDatabaseConnection.new(self.new).connect(customer)
          end

          # Public: determine HTTP_HOST from params passed to rake task.
          #
          # Returns HTTP_HOST string.
          def self.http_client_from_params(params)
            return 'localhost'

            client = params[:client] or fail 'Client name not provided.'

            case Rails.env
            when 'production'
              "#{client}.prod-server.your-company.com"
            when 'staging'
              "#{client}.stage-server.your-company.com"
            when 'local'
              "localhost"
            else
              fail "Environment is not production or staging (#{Rails.env})"
            end
          end

        # Private: run a search and output the result.
        #
        # Returns nothing
        def call(env)
          #export_results
          return true
        end
      end  # class DbConnect
    end   # module Database
  end  # module V1
end # module Epublishing

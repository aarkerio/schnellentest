module Chipotle
  module V1
    module ErrorHandling
      extend ActiveSupport::Concern

      include Chipotle::V1

        included do
          rescue_from Exception, :with => :rescue_from_exception          # catch-all
          rescue_from StandardError, :with => :rescue_from_standard_error # catch-all *almost*
          rescue_from HttpErrors::BadRequest, :with => :rescue_from_unsupported_action_exception
          rescue_from HttpErrors::NotFound, :with => :rescue_from_not_found
          rescue_from ActiveRecord::RecordInvalid, :with => :rescue_from_record_invalid
          rescue_from ActiveRecord::RecordNotFound, :with => :rescue_from_record_not_found
        end

        protected

        def rescue_from_standard_error(exception)
          respond_for_exception(exception, :status => :internal_server_error)
        end

        def rescue_from_exception(exception)
          text = 'Fatal Error: See logs for details or contact system administrator'
          respond_for_exception(exception, text: text, display_message: text, status: :internal_server_error)
        end

        def rescue_from_missing_param(exception)
          text = "Missing values for #{exception.param}."
          respond_for_exception(exception, :text => text, :display_message => text, :status => :bad_request)
        end

        def rescue_from_not_found(exception)
          respond_for_exception(exception, :status => :not_found)
        end

        def rescue_from_record_invalid(exception)
          logger.error exception.class

          errors = case exception
                   when ActiveRecord::RecordInvalid
                     exception.record.errors
                   else
                     fail ArgumentError, "ActiveRecord::RecordInvalid exception."
                   end

          errors.messages.each_pair do |c, e|
            logger.error "#{c}: #{e}"
          end

          text = pp_exception(exception, with_class: false)
          respond_for_exception(exception, status: :unprocessable_entity, text: text, with_logging: false)
        end

        def rescue_from_record_not_found(exception)
          text = pp_exception(exception, :with_class => false)
          respond_for_exception(exception, :status => :not_found, :text => text)
        end

        def respond_for_exception(exception, options = {})
          options = options.reverse_merge(
              with_logging:    true,
              status:          exception.respond_to?('status_code') ? exception.status_code : :internal_server_error,
              text:            exception.message,
              display_message: exception.message)

          options[:errors] = exception.respond_to?(:record) ? exception.record.errors : [exception.message]
          logger.error pp_exception(exception) if options[:with_logging]

          respond_to do |format|
            format.json { render json: { displayMessage: options[:display_message], errors: options[:errors]}, status: options[:status] }
            format.all { render text: options[:text], status: options[:status] }
          end
        end

        def pp_exception(exception, options = {})
          options = options.reverse_merge( with_class: true, with_body: true, with_backtrace: true )
          message = ""
          message << "#{exception.class}: " if options[:with_class]
          message << "#{exception.message}\n"
          message << "Body: #{exception.http_body}\n" if options[:with_body] && exception.respond_to?(:http_body)
          message << exception.backtrace.join("\n") if options[:with_backtrace]
          message
        end

      def format_subsys_exception_hash(exception)
        orig_hash = JSON.parse(exception.response).with_indifferent_access rescue {}

        orig_hash[:displayMessage] = exception.response.to_s.gsub(/^"|"$/, "") if orig_hash[:displayMessage].nil? && exception.respond_to?(:response)
        orig_hash[:displayMessage] = exception.message if orig_hash[:displayMessage].blank?
        orig_hash[:errors] = [orig_hash[:displayMessage]] if orig_hash[:errors].nil?
        orig_hash
      end
    end
  end
end

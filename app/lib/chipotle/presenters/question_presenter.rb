module Chipotle
  module Presenters
    # This class delegates to a Response object that contains the following:
    # - question: participant's Participation
    class QuestionPresenter < BasePresenter
      # Public. Get type of question.
      # qtype - Integer
      # Returns string.
      def question_type(qtype)
        case qtype
        when 1 then 'Multiple Option'
        when 2 then 'Open question'
        when 3 then 'True/False'
        when 4 then 'Fullfill'
        when 5 then 'Composite Question'
        end
      end

      private

      def admin?
        false # @_admin ||= self[:admin]
      end
    end
  end
end

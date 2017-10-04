module Chipotle
  module Presenters
    # Base Presenter class
    class BasePresenter < SimpleDelegator
      def initialize(model, view)
        @model = model
        @view  = view
        super(@model)
      end

      def h
        @view
      end
    end
  end
end

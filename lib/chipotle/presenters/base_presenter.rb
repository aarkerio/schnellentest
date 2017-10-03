class BasePresenter < SimpleDelegator
  include Rails.application.routes.url_helpers

  attr_reader :context, :params

  def initialize(data_obj, context, params = {})
    @context = context
    @params = params
    super(data_obj)
  end
end

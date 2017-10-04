module Chipotle
class Presenters::BasePresenter < SimpleDelegator
  def initialize(model, view)
    @model, @view = model, view
    super(@model)
  end

  def h
    @view
  end
end
end

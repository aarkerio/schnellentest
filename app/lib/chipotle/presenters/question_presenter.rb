# This class delegates to a Response object that contains the following:
# - question: participant's Participation
# - admin: true if in admin panel

module Chipotle
class Presenters::QuestionPresenter  < Presenters::BasePresenter

  def question_type(qtype)
    case qtype
    when 1
      'Multiple Option'
    when 2
      'Open question'
    when 3
      'True/False'
    when 4
      'Fullfill'
    when 5
      'Composite Question'
    end
  end

  private

  def admin?
    false #@_admin ||= self[:admin]
  end
end
end

module ApplicationHelper
  def bootstrap_class_for flash_type
    { success: "alert-success", error: "alert-danger", alert: "alert-warning", notice: "alert-info" }[flash_type.to_sym] || flash_type.to_s
  end

  def flash_messages(opts = {})
    flash.each do |msg_type, message|
      concat(content_tag(:div, message, class: "alert #{bootstrap_class_for(msg_type)} alert-dismissible", role: 'alert') do
        concat(content_tag(:button, class: 'close', data: { dismiss: 'alert' }) do
          concat content_tag(:span, '&times;'.html_safe, 'aria-hidden' => true)
          concat content_tag(:span, 'Close', class: 'sr-only')
        end)
        concat message
      end)
    end
    nil
  end
  def display_status(status)
    (status == true) ? image('icon_true.png') : image('icon_false.png')
  end

  # Public. Call the presenter for the model
  #
  # model - the AR model.
  # Return a Presenter Object.
  def present(model, presenter_class=nil)
    klass = presenter_class || "Chipotle::Presenters::#{model.class}Presenter".constantize
    presenter = klass.new(model, self)
    yield(presenter) if block_given?
   end

  private

  def image(icon)
     image_tag icon
  end

end

# Organizer class

# example of call: PlaceOrder.call(sale: Sale.new(params[:sales]))

class PlaceOrder
  include Interactor::Organizer

  organize CreateSale, ProcessStock, DispatchShipping, SendConfirmationEmail
end




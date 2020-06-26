module Types
  class MutationType < Types::BaseObject
    field :create_test, mutation: Mutations::CreateTest
    # TODO: remove me
    field :create_test, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end

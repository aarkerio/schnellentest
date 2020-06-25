module Types
  class QueryType < Types::BaseObject
    field :post, PostType, null: true do
      description "Find a post by ID"
      argument :id, ID, required: true
    end

    def post(id:)
      Post.find(id)
    end

    field :get_user_tests, [TestType], null: true do
      description "Find all tests from a user"
      argument :user_id, ID, required: true
      argument :active, boolean, required: true
    end

    def get_user_tests(user_id:, active:)
      Test.user_tests(user_id: user_id, active: active)
    end
  end
end

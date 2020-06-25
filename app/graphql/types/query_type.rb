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
      description "Find all tests from user_id integer"
      argument :user_id, Integer, required: true
      argument :active, Boolean, required: true
    end

    def get_user_tests(user_id: nil, active: nil)
      Test.user_tests(user_id: user_id, active: active)
    end
  end
end

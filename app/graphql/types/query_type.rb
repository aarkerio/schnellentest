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
      description "Find all tests from user_guid"
      argument :user_guid, String, required: true
      argument :active, Boolean, required: true
    end

    def get_user_tests(user_guid: nil, active: nil)
      Test.user_tests(user_guid, active)
    end

    field :get_one_test, [TestType], null: true do
      description "Find all tests from user_id integer"
      argument :uurlid, String, required: true
    end

    def get_one_test(uurlid: nil)
      Test.get_one(uurlid_id: uurlid)
    end

  end
end

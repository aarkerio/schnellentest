module Types
  class TestType < Types::BaseObject
    field :uurlid, ID, null: false
    field :title, String, null: false
    field :tags, String, null: false
    field :active, Boolean, null: true
    field :lang, String, null: true
    field :subject_id, Integer, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    # field :questions, [Types::QuestionType], null: true
  end
end

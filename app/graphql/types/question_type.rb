module Types
  class QuestionType < Types::BaseObject
    field :id, Integer, null: false
    field :user_id, Integer, null: false
    field :question, String, null: true
    field :qtype, Integer, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end

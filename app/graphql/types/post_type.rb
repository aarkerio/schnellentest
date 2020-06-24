module Types
  class PostType < Types::BaseObject
    field :id, ID, null: false
    field :user_id, Integer, null: false
    field :title, String, null: true
    field :body, String, null: true
    field :published, Boolean, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :rating, Integer, null: true
    field :comments, [Types::CommentType], null: true
  end
end

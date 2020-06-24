module Types
  class CommentType < Types::BaseObject
    field :id, ID, null: false
    field :post, PostType, null: false
  end
end

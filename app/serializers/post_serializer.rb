class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :comments, :post_photo
end

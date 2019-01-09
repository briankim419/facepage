class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :comments
end

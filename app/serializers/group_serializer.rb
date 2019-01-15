class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :users, :chat
end

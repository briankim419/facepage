class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :followers, :followeds, :current_user, :groups
end

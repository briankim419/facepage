class Group < ApplicationRecord
  has_many :usergroup
  has_many :users, through: :usergroup
end

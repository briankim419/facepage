class Group < ApplicationRecord
  has_many :usergroups
  has_many :users, through: :usergroups

  belongs_to :chat
  validates :name ,presence: true
end

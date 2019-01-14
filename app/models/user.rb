class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :messages

  has_many :usergroup
  has_many :groups, through: :usergroup

  has_many :follower_follows, class_name: "Follow", foreign_key: :follower_id
  has_many :followeds, through: :follower_follows, source: :followed

  has_many :followed_follows, class_name: "Follow", foreign_key: :followed_id
  has_many :followers, through: :followed_follows, source: :follower

  validates_presence_of :first_name, :last_name

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end

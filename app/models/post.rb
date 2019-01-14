class Post < ApplicationRecord
  has_many :comments
  mount_uploader :post_photo, PostPhotoUploader

  validates :body ,presence: true
end

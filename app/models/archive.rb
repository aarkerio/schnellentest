#  Chipotle Software (c) 2016   MIT License
class Archive < ApplicationRecord
  belongs_to :user
  mount_uploader :file, FileUploader

  validates :name, presence: true
end

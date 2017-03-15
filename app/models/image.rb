# coding: utf-8
# frozen_string_literal: true
class Image < ApplicationRecord
  belongs_to :user

  validates :image, presence: true
  validate :file_size

  def file_size
    if avatar.file.size.to_f/(1000*1000) > 2000000
      errors.add(:file, "You cannot upload a file greater than #{upload_limit.to_f}MB")
    end
  end
end

# coding: utf-8
# frozen_string_literal: true
class Image < ApplicationRecord
  belongs_to :user

  validates :image, presence: true
  validates_attachment_size :image, less_than: 15.megabytes
end

# coding: utf-8
# frozen_string_literal: true
class Doc < ApplicationRecord
  belongs_to :user
  mount_uploader :attachment, AttachmentUploader
  validates :name, presence: true

end

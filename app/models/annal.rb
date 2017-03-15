# coding: utf-8
# frozen_string_literal: true
class Annal < ApplicationRecord
  # include Chipotle::FileReader

  belongs_to :user

  self.per_page = 20

  mount_uploader :file, FileUploader

  validate :sumcheck_uniqueness

  before_validation :set_md5

  private

  def set_md5
    checksum = Digest::MD5.file("#{file.file.file}").hexdigest
    self.sumcheck = checksum
  end

  def sumcheck_uniqueness
    if Annal.exists?(sumcheck: sumcheck)
      errors.add(:duplicated, "The file already was upload, checksum: <a href=\"/annals/checksum/#{sumcheck.to_s}\">Download</a>")
    end
  end

end

# coding: utf-8
# frozen_string_literal: true
class Annal < ApplicationRecord
  include Chipotle::FileReader

  belongs_to :user

  self.per_page = 20

  mount_uploader :file, FileUploader

  validates :sumcheck, uniqueness: {message: :no_unique }

  before_validation :set_md5

  after_commit :process, on: :create

  private

  def set_md5
    checksum = Digest::MD5.file("#{file.file.file}").hexdigest
    self.sumcheck = checksum
  end

  def sumcheck_uniqueness
    "The file already was upload, checksum: <a href=\"/annals/checksum/#{sumcheck.to_s}\">Download</a>"
  end

  private

  def process
    text = convert_file(file.file.file)
    update_columns( content: text, json: text )
  end
end

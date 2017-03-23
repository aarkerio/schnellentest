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

  # Checks if the json will be properly saved
  def verify_test(params)
    return 4 if done
    begin
      verify_json params[:json]
    rescue  => e
      logger.debug "## Test Exception ###>>>  #{e.inspect}"
      1 # general error
    end
  end

  # Saves the json into test model
  def export
    return 3 if done
    json_to_test params[:json]
  end

  private

  def set_md5
    checksum = Digest::MD5.file("#{file.file.file}").hexdigest
    self.sumcheck = checksum
  end

  def sumcheck_uniqueness
    "The file already was upload, checksum: <a href=\"/annals/checksum/#{sumcheck.to_s}\">Download</a>"
  end

  def process
    text = convert_file(file.file.file)
    new_json = json_string + text
    update_columns( content: text, json: new_json )
  end
end

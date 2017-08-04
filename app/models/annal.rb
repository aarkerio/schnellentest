# coding: utf-8
# frozen_string_literal: true
# Chipotle Software 2016-2017 (c) MIT License
class Annal < ApplicationRecord
  include Chipotle::FileReader

  belongs_to :user

  self.per_page = 20

  mount_uploader :file, FileUploader

  validates :sumcheck, uniqueness: {message: :no_unique }

  before_validation :set_md5

  after_commit :process, on: :create

  # Checks if the json will be properly saved
  def verify_or_save(params, user_id, save=false)
    logger.debug "## XXXXXXXXXXXXXXXXXXXXXXXXX : ###>>> message.inspect"
    return 4 if done
    logger.debug "## HHHHHHHHHHHHe : ###>>> message.inspect"
    begin
      message = verify_or_save_json(params[:json], user_id, save)
      logger.debug "## message : ###>>>  #{message.inspect}"
      self.update_attribute(:done, true)  if message == 11
      message
    rescue  => e
      logger.debug "## Test Exception on verify or save ###>>>  #{e.inspect}"
      1 # general error
    end
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
    new_json = json_string(sumcheck) + text
    update_columns( content: text, json: new_json )
  end
end

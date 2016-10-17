#  Chipotle Software (c) 2016   MIT License
class Import < ApplicationRecord
  belongs_to :user

  mount_uploader :file, JsonFileUploader

  validate :sumcheck_uniqueness

  before_validation :set_md5

  private

  def set_md5
    checksum = Digest::MD5.file("#{file.file.file}").hexdigest
    self.sumcheck = checksum
  end

  def sumcheck_uniqueness
    logger.debug "####  sumcheck #################>>>  #{sumcheck.inspect}"
    if Annal.exists?(sumcheck: sumcheck)
      errors.add(:duplicated, "The file already was upload, checksum: <a href=\"/annals/checksum/#{sumcheck.to_s}\">Download</a>")
    end
  end

end

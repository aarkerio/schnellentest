#  Chipotle Software (c) 2016   MIT License
class Archive < ApplicationRecord
  belongs_to :user

  mount_uploader :file, FileUploader

  #validates :file, presence: true
  #validates :sumcheck, presence: true, uniqueness: { message: 'This file was already uploaded' }

  def self.order_params params, user_id
    uploaded_file = params[:archive][:file]
    sumcheck = Digest::MD5.hexdigest uploaded_file.tempfile.path
    { notes: params[:archive][:notes], sumcheck: sumcheck, file: uploaded_file.original_filename.to_s, user_id: user_id }
  end

end

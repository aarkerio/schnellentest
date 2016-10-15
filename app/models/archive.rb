#  Chipotle Software (c) 2016   MIT License
class Archive < ApplicationRecord
  belongs_to :user

  mount_uploader :file, FileUploader

  validates :file, presence: true
  validates :sumcheck, presence: true, uniqueness: true

  def add_new params, user_id
    uploaded_file = params[:archive][:file]
    sumcheck = Digest::MD5.hexdigest uploaded_file.tempfile.path
    new_params = {notes: params[:archive][:notes], sumcheck: sumcheck, file: uploaded_file.original_filename.to_s, user_id: user_id}
    self.save new_params
  end

end

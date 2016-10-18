#  Chipotle Software (c) 2016   MIT License
class Import < ApplicationRecord
  belongs_to :user

  mount_uploader :file, JsonFileUploader

 def import_json(params)
   self.oname = params[:file].original_filename
   insert_questions(file_name)
   save!
 end

 private

 def insert_questions(file_name)
   file = File.read('vendor/assets/tests/biologia_1.json')
   file = File.read(file_name)
   data_hash = JSON.parse(file)

 end

 # .gsub(/\n/, '\\n').gsub(/\r/, "\\r").gsub(/\t/, "\\t").gsub(/\f/, "\\f")
end

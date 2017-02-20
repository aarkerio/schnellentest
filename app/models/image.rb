# frozen_string_literal: true
class Image < ApplicationRecord
  belongs_to :user

   default_scope -> { order_by(picture_number: 'asc') }

  field :picture_number, type: Integer, default: 0

  embedded_in :home, inverse_of: :pictures
  embedded_in :lead, inverse_of: :pictures
  embedded_in :home_application, inverse_of: :pictures
  embedded_in :zone

  has_mongoid_attached_file :image,
                            styles: {
                              hd: ['1920x1080>', :jpg],
                              big: ['960x540>', :jpg],
                              medium: ['480x270>', :jpg],
                              thumb: ['240x135>', :jpg]
                            },
                            storage: :s3,
                            s3_credentials: {
                              #bucket: Rails.application.secrets.s3_bucket,
                              access_key_id: Rails.application.secrets.access_key_id,
                              secret_access_key: Rails.application.secrets.secret_access_key
                            },
                            path: ':style/:hash.:extension',
                            hash_secret: Rails.application.secrets.paperclip_hash,
                            convert_options: { all: '-strip -interlace Plane -quality 72' },
                            s3_protocol: Rails.env.production? ? :https : :http

  validates :image, presence: true
  validates_attachment_content_type :image, content_type: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
  validates_attachment_size :image, less_than: 15.megabytes
end

# GPLv3 Chipotle Software (c) 2016
class User < ApplicationRecord

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :validatable, :omniauthable, :omniauth_providers => [:facebook]

  has_secure_token  # For API calls

  belongs_to :group

  before_create :generate_guid   # access_token
  before_create :set_active

  has_many :tests, dependent: :destroy

  validates :guid, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :uname, presence: true, uniqueness: true

  def get_guid
    random_guid = ''
    loop do
      random_guid = SecureRandom.urlsafe_base64(nil, false)
      break random_guid   unless ::User.exists?(guid: random_guid)
    end
    random_guid
  end

  def get_guid!(token)
    token == self.guid
  end

  ## omni auth FB starts
  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.name = auth.info.name   # assuming the user model has a name
      user.image = auth.info.image # assuming the user model has an image
    end
  end

  def apply_omniauth(omniauth)
    self.username = omniauth['info']['nickname'] if username.blank?
    self.email = omniauth['info']['email'] if email.blank?

    authentications.build(:provider     => omniauth['provider'],
                          :uid          => omniauth['uid'],
                          :token        => omniauth['credentials'].token,
                          :token_secret => omniauth['credentials'].secret)
  end

  def password_required?
    (authentications.empty? || !password.blank?) && super
  end

  def update_with_password(params, *options)
    if encrypted_password.blank?
      update_attributes(params, *options)
    else
      super
    end
  end

  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    user = User.where(uid: auth.uid).first
    user = User.where(email: auth.info.email).first if user.nil?
    if user
      user.update_attribute(:uid, auth.uid) if user.uid.nil?
    else
      Rails.logger.info auth
      user = User.new(uid: auth.uid,
                      name: auth.info.name,
                      email: auth.info.email,
                      password: Devise.friendly_token[0,20] )
      user.save
    end
    user
  end
  ## omni auth FB ends

  private

  def generate_guid
    self.guid = get_guid
  end

  def set_active
    self.active   = true
    self.group_id = 2
  end

  # To update a table with already existent users
  def generate_all_guids
    find_each do |user|
      next  if guid.nil?
      guid = SecureRandom.urlsafe_base64(nil, false)
      save
    end
  end
end

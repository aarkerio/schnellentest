# GPLv3 Chipotle Software (c) 2016
class User < ApplicationRecord

   # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  
  belongs_to :group

  before_create :generate_token
  before_create :set_active
  
  has_many :tests, dependent: :destroy
  
  validates :guid, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :uname, presence: true, uniqueness: true

  def get_token
    random_token = ''
    loop do
      random_token = SecureRandom.urlsafe_base64(nil, false)
      break random_token   unless ::User.exists?(guid: random_token)
    end
    random_token
  end

  private

  def generate_token
    self.guid = get_token
  end

  def set_active
    self.active   = true
    self.group_id = 2
  end

  # To update a table with already existent users
  def generate_all_tokens
    find_each do |user|
      next  if guid.nil?
      guid = SecureRandom.urlsafe_base64(nil, false)
      save
    end
  end
end

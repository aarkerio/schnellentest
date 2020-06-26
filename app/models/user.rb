# coding: utf-8
# frozen_string_literal: true
# GPLv3 Chipotle Software (c) 2016-2020
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :validatable

  has_secure_token  # For API calls

  belongs_to :group, dependent: :destroy

  before_create :generate_guid   # access_token
  before_create :set_active

  has_many :tests

  validates :guid, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :uname, presence: true, uniqueness: true

  def get_guid
    random_guid = ''
    loop do
      random_guid = SecureRandom.hex.downcase
      break random_guid   unless ::User.exists?(guid: random_guid)
    end
    random_guid
  end

  def get_guid!(token)
    token == self.guid
  end

  private

  def full_name
    [fname, lname].join(' ')
  end

  def generate_guid
    self.guid = get_guid
  end

  def set_active
    self.active = true
    group = Group.find_by_name 'Admin'
    self.group_id = group.id
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

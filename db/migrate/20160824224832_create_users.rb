# Chipotle Software (c) 2016-2020   MIT License
class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :uname, unique: true, null: false
      t.string :fname, null: false
      t.string :lname, null: false
      t.string :guid, unique: true, null: false   # global user ID
      t.string :uid                              # facebook ID
      t.string :password
      t.boolean :active
      t.string :token, unique: true, null: false
      t.references :group, foreign_key: true

      t.timestamps
    end
  end
end

# Chipotle Software (c) 2016    MIT License
class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :uname, unique: true, null: false
      t.string :fname, null: false 
      t.string :lname, null: false
      t.string :guid   # global user ID
      t.string :password
      t.boolean :active
      t.references :group, foreign_key: true

      t.timestamps
    end
  end
end

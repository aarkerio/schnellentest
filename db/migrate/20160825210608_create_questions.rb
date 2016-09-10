# Chipotle Software (c) 2016    MIT License
class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.references :user, foreign_key: true
      t.text :question, null: false
      t.text :explanation 
      t.text :hint
      t.text :tags
      t.integer :worth, null: false, default: 5

      t.timestamps
    end
  end
end

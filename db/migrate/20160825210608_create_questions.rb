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
      t.boolean :active, null: false, default: true
      t.boolean :qtype, null: false, default: true  # question type multiple option by default

      t.timestamps
    end
  end
end

# Chipotle Software (c) 2016   MIT License 
class CreateTestQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :test_questions do |t|
      t.references :test, foreign_key: true
      t.references :question, foreign_key: true
      t.integer :order

      t.timestamps
    end
  end
end

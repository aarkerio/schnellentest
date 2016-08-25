class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.references :user, foreign_key: true
      t.text :question
      t.text :hint
      t.text :explanation
      t.integer :worth, default: 5
      t.boolean :active, default: true
      t.boolean :type, default: true  # multiple option by default

      t.timestamps
    end
  end
end

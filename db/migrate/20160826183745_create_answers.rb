class CreateAnswers < ActiveRecord::Migration[5.0]
  def change
    create_table :answers do |t|
      t.references :user, foreign_key: true
      t.text :answer
      t.boolean :correct
      t.references :question, foreign_key: true

      t.timestamps
    end
  end
end

class CreateCompositeAnswers < ActiveRecord::Migration[5.0]
  def change
    create_table :composite_answers do |t|
      t.references :question, foreign_key: true
      t.references :user, foreign_key: true
      t.string :first_column
      t.string :second_column
      t.string :correct_column

      t.timestamps
    end
  end
end

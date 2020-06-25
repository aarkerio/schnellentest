class CreateCompositeAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :composite_answers do |t|
      t.references :question, foreign_key: true
      t.string :first_column
      t.string :second_column
      t.string :correct_column
      t.string :name_column

      t.timestamps
    end
  end
end

class AddIdToQuestionTests < ActiveRecord::Migration[5.1]
  def change
    add_column :question_tests, :id, :primary_key
  end
end

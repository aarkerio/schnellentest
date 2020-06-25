class AddIdToQuestionTests < ActiveRecord::Migration[6.0]
  def change
    add_column :question_tests, :id, :primary_key
  end
end

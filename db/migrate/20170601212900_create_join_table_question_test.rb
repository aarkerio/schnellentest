class CreateJoinTableQuestionTest < ActiveRecord::Migration[5.1]
  def change
    create_join_table :questions, :tests do |t|
      # t.index [:question_id, :test_id]
      # t.index [:test_id, :question_id]
    end
  end
end

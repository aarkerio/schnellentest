class CreateArchives < ActiveRecord::Migration[5.0]
  def change
    create_table :archives do |t|
      t.references :user, foreign_key: true
      t.string :notes
      t.string :sumcheck
      t.string :file

      t.timestamps
    end
  end
end

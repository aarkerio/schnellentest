class CreateArchives < ActiveRecord::Migration[5.0]
  def change
    create_table :archives do |t|
      t.references :user, foreign_key: true
      t.text :notes
      t.text :name

      t.timestamps
    end
  end
end

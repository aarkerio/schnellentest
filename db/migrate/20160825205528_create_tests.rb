class CreateTests < ActiveRecord::Migration[6.0]
  def change
    create_table :tests do |t|
      t.references :user, foreign_key: true
      t.string :title, null: false
      t.string :tags
      t.string :lang
      t.references :subject, foreign_key: true, null: false
      t.string :uurlid, unique: true, null: false
      t.string :origin
      t.text :description
      t.text :instructions
      t.integer :level, null: false, default: 1
      t.boolean :active, default: true
      t.boolean :shared, default: true

      t.timestamps
    end
  end
end

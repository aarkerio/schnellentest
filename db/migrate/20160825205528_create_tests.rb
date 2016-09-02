class CreateTests < ActiveRecord::Migration[5.0]
  def change
    create_table :tests do |t|
      t.references :user, foreign_key: true
      t.string :title, null: false
      t.string :tags
      t.text :description
      t.boolean :active, default: true
      t.boolean :shared, default: true

      t.timestamps
    end
  end
end

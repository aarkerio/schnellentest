class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.references :user, foreign_key: true
      t.text :file
      t.boolean :active

      t.timestamps
    end
  end
end

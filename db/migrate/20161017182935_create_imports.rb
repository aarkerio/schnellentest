class CreateImports < ActiveRecord::Migration[5.0]
  def change
    create_table :imports do |t|
      t.references :user, foreign_key: true
      t.string :file
      t.string :oname
      t.string :notes

      t.timestamps
    end
  end
end

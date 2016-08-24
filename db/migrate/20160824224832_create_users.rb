class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :fname
      t.string :lname
      t.string :uname
      t.string :passwd
      t.boolean :active
      t.references :group, foreign_key: true

      t.timestamps
    end
  end
end

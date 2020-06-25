class CreateAnnals < ActiveRecord::Migration[6.0]
  def change
    create_table :annals do |t|
      t.references :user, foreign_key: true
      t.string :notes
      t.string :sumcheck
      t.string :file
      t.boolean :done, default: false

      t.timestamps
    end
  end
end

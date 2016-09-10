class AddColumnsToQuestion < ActiveRecord::Migration[5.0]
  def change
    add_column :questions, :active, :boolean
    add_column :questions, :qtype, :boolean
  end
end

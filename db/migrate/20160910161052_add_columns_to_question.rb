class AddColumnsToQuestion < ActiveRecord::Migration[5.0]
  def change
    add_column :questions, :active, :boolean
    # qtype 1: multiple option, 2: open, 3: true/false, 4: fullfill, 5: relationships
    add_column :questions, :qtype, :boolean
  end
end

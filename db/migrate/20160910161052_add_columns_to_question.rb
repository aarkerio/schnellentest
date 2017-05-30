class AddColumnsToQuestion < ActiveRecord::Migration[5.0]
  def change
    add_column :questions, :active, :boolean
    # qtype 1: multiple option, 2: open, 3: true/false, 4: fullfill, 5: composite questions
    add_column :questions, :qtype, :integer
    add_column :questions, :spellcheck, :boolean
    add_column :questions, :copyright, :boolean
  end
end

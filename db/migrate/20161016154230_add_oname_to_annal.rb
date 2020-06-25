class AddOnameToAnnal < ActiveRecord::Migration[6.0]
  def change
    add_column :annals, :oname, :string, null: false
  end
end

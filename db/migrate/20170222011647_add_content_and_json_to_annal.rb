class AddContentAndJsonToAnnal < ActiveRecord::Migration[5.0]
  def change
    add_column :annals, :content, :text
    add_column :annals, :json, :text
  end
end

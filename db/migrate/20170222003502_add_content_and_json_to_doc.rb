class AddContentAndJsonToDoc < ActiveRecord::Migration[5.0]
  def change
    add_column :docs, :content, :text
    add_column :docs, :json, :text
  end
end

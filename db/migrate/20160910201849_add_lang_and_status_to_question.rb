class AddLangAndStatusToQuestion < ActiveRecord::Migration[5.0]
  def change
    add_column :questions, :lang, :string, null: false, default: 'en'
    add_column :questions, :status, :integer, null: false, default: 0
  end
end

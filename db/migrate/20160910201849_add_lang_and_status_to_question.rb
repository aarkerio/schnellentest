class AddLangAndStatusToQuestion < ActiveRecord::Migration[5.0]
  def change
    add_column :questions, :lang, :string, null: false, default: 'en'
    # status 1: not reviewed, not translated
    # status 2: reviewed, not translated
    # status 3: reviewed, translated
    add_column :questions, :status, :integer, null: false, default: 0
  end
end

# coding: utf-8
# frozen_string_literal: true
class CreateDocs < ActiveRecord::Migration[5.0]
  def change
    create_table :docs do |t|
      t.string :name
      t.text :description
      t.string :file
      t.string :dochash
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end

# coding: utf-8
# frozen_string_literal: true
class CreateQuestionsAndTests < ActiveRecord::Migration[5.0]
  def change
    create_table :questions_tests do |t|
      t.belongs_to :test, index: true
      t.belongs_to :question, index: true
      t.integer :order

      t.timestamps
    end
  end
end


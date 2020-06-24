# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_24_214440) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "annals", id: :serial, force: :cascade do |t|
    t.integer "user_id"
    t.string "notes"
    t.string "sumcheck"
    t.string "file"
    t.boolean "done", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "oname", null: false
    t.text "content"
    t.text "json"
    t.index ["user_id"], name: "index_annals_on_user_id"
  end

  create_table "answers", id: :serial, force: :cascade do |t|
    t.text "answer", null: false
    t.boolean "correct", null: false
    t.boolean "active", default: false
    t.integer "question_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_answers_on_question_id"
  end

  create_table "composite_answers", id: :serial, force: :cascade do |t|
    t.integer "question_id"
    t.string "first_column"
    t.string "second_column"
    t.string "correct_column"
    t.string "name_column"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_composite_answers_on_question_id"
  end

  create_table "groups", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "images", id: :serial, force: :cascade do |t|
    t.integer "user_id"
    t.text "file"
    t.boolean "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_images_on_user_id"
  end

  create_table "imports", id: :serial, force: :cascade do |t|
    t.integer "user_id"
    t.string "file"
    t.string "oname"
    t.string "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_imports_on_user_id"
  end

  create_table "posts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "title"
    t.text "body"
    t.boolean "published"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "question_tests", force: :cascade do |t|
    t.bigint "question_id", null: false
    t.bigint "test_id", null: false
    t.integer "order", null: false
    t.index ["question_id", "test_id"], name: "index_question_tests_on_question_id_and_test_id"
    t.index ["test_id"], name: "index_question_tests_on_test_id"
  end

  create_table "questions", id: :serial, force: :cascade do |t|
    t.integer "user_id"
    t.text "question", null: false
    t.text "explanation"
    t.text "hint"
    t.string "tags"
    t.tsvector "searchtext"
    t.integer "worth", default: 5, null: false
    t.integer "origin", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active"
    t.integer "qtype"
    t.boolean "spellcheck"
    t.boolean "copyright"
    t.string "lang", default: "en", null: false
    t.integer "status", default: 0, null: false
    t.index ["searchtext"], name: "ques_idx", using: :gin
    t.index ["user_id"], name: "index_questions_on_user_id"
  end

  create_table "tests", id: :serial, force: :cascade do |t|
    t.integer "user_id"
    t.string "title", null: false
    t.string "tags"
    t.string "lang"
    t.string "origin"
    t.text "description"
    t.text "instructions"
    t.integer "level", default: 1, null: false
    t.boolean "active", default: true
    t.boolean "shared", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tests_on_user_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "uname", null: false
    t.string "fname", null: false
    t.string "lname", null: false
    t.string "guid", null: false
    t.string "uid"
    t.string "password"
    t.boolean "active"
    t.string "token", null: false
    t.integer "group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["group_id"], name: "index_users_on_group_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "annals", "users"
  add_foreign_key "answers", "questions"
  add_foreign_key "composite_answers", "questions"
  add_foreign_key "images", "users"
  add_foreign_key "imports", "users"
  add_foreign_key "posts", "users"
  add_foreign_key "questions", "users"
  add_foreign_key "tests", "users"
  add_foreign_key "users", "groups"
end

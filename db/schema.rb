# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161017182935) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "annals", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "notes"
    t.string   "sumcheck"
    t.string   "file"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "oname",      null: false
    t.index ["user_id"], name: "index_annals_on_user_id", using: :btree
  end

  create_table "answers", force: :cascade do |t|
    t.text     "answer",                      null: false
    t.boolean  "correct",                     null: false
    t.boolean  "active",      default: false
    t.integer  "question_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["question_id"], name: "index_answers_on_question_id", using: :btree
  end

  create_table "groups", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "imports", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "notes"
    t.string   "file"
    t.string   "oname"
    t.string   "tags"
    t.string   "string"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_imports_on_user_id", using: :btree
  end

  create_table "questions", force: :cascade do |t|
    t.integer  "user_id"
    t.text     "question",                   null: false
    t.text     "explanation"
    t.text     "hint"
    t.text     "tags"
    t.tsvector "searchtext"
    t.integer  "worth",       default: 5,    null: false
    t.integer  "origin",      default: 1,    null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.boolean  "active"
    t.boolean  "qtype"
    t.string   "lang",        default: "en", null: false
    t.integer  "status",      default: 0,    null: false
    t.index ["searchtext"], name: "ques_idx", using: :gin
    t.index ["user_id"], name: "index_questions_on_user_id", using: :btree
  end

  create_table "test_questions", force: :cascade do |t|
    t.integer  "test_id"
    t.integer  "question_id"
    t.integer  "order"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["question_id"], name: "index_test_questions_on_question_id", using: :btree
    t.index ["test_id"], name: "index_test_questions_on_test_id", using: :btree
  end

  create_table "tests", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "title",                      null: false
    t.string   "tags"
    t.text     "description"
    t.integer  "level",       default: 1,    null: false
    t.boolean  "active",      default: true
    t.boolean  "shared",      default: true
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["user_id"], name: "index_tests_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "uname",                               null: false
    t.string   "fname",                               null: false
    t.string   "lname",                               null: false
    t.string   "guid",                                null: false
    t.string   "password"
    t.boolean  "active"
    t.string   "token",                               null: false
    t.integer  "group_id"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["group_id"], name: "index_users_on_group_id", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "annals", "users"
  add_foreign_key "answers", "questions"
  add_foreign_key "imports", "users"
  add_foreign_key "questions", "users"
  add_foreign_key "test_questions", "questions"
  add_foreign_key "test_questions", "tests"
  add_foreign_key "tests", "users"
  add_foreign_key "users", "groups"
end

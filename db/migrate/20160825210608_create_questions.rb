# Chipotle Software (c) 2016    MIT License
class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.references :user, foreign_key: true
      t.text :question, null: false
      t.text :explanation 
      t.text :hint
      t.text :tags
      t.column :searchtext, 'tsvector'
      t.integer :worth, null: false, default: 5
      t.integer :origin, null: false, default: 1

      t.timestamps
    end

    reversible do |dir|
      dir.up do
        execute <<-SQL
          CREATE TEXT SEARCH DICTIONARY schnellen_en (template = snowball,language = english);
        SQL
        execute <<-SQL
          CREATE TEXT SEARCH CONFIGURATION public.schnellen_en ( COPY = pg_catalog.english ); 
        SQL
      
        # execute <<-SQL
        #  CREATE INDEX questions_idx ON questions USING gin(to_tsvector('public.schnellen_en', question || ' ' || explanation || ' ' || hint || ' ' || tags  ));
        # SQL

        execute <<-SQL
          CREATE TRIGGER ts_searchtext BEFORE INSERT OR UPDATE ON questions FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger('searchtext', 'public.schnellen_en', 'question', 'explanation', 'hint', 'tags');
        SQL

        execute <<-SQL
          CREATE INDEX ques_idx ON questions USING gin(searchtext);
        SQL
      end
    end
  end

end

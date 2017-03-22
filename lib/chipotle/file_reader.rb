# coding: utf-8
# frozen_string_literal: true
require 'pdf-reader'
require 'doc_ripper'

module Chipotle
  module FileReader
    def convert_file(file)
      DocRipper::rip(file)
    end

    # Converts json string to hash
    def json_to_test(json)
      valid = true
      logger.debug "####  PRE JSON #################>>>  #{json.inspect}"
      hash = JSON.parse(json_string)
      logger.debug "####  NEW HASH #################>>>  #{hash.inspect}"
      return 6 unless is_test_valid? hash

      # {"title"=>"Some title", "description"=>"Some description", "instructions"=>"", "level"=>"1", "lang"=>"es", "tags"=>"tag_one, tag_two", "status"=>"1",
      # "questions"=>[{"status"=>"1", "qtype"=>"1", "hint"=>"Some hint", "explanation"=>"", "question"=>"Some question",
      # "answers"=>[{"answer"=>"Answer one", "correct"=>"false"}, {"answer"=>"Answer two", "correct"=>"true"}]}]}
      hash["questions"].each do |q|
       logger.debug "####  QUESTION #################>>>  #{q.inspect}"
       question = Question.new q
       return 7 unless question.valid?
      end
      valid
    end

    def is_test_valid?(hash)
      attrs = {
        title:        hash['title'],
        description:  hash['description'],
        instructions: hash['instructions'],
        level:        hash['level'],
        lang:         hash['lang'],
        tags:         hash['tags']
      }
      test = Test.new attrs
      test.valid?
    end

    def is_question_valid?(question)
      attrs = {
        title:        hash['title'],
        description:  hash['description'],
        instructions: hash['instructions'],
        level:        hash['level'],
        lang:         hash['lang'],
        tags:         hash['tags']
      }
      test = Question.new attrs
      test.valid?
    end
    # Just an initial string to save work
    def json_string
      %{ { "title": "Some title",
        "description": "Some description",
        "instructions": "",
        "level": "1",
        "lang": "es",
        "tags": "tag_one, tag_two",
        "status": "1",
        "questions": [
          {
            "status": "1",
            "qtype" : "1",
            "hint" : "Some hint",
            "explanation": "",
            "question": "Some question",
            "answers": [
               { "answer": "Answer one", "correct": "false" },
               { "answer": "Answer two", "correct": "true" }
            ]
         }
        ] }
      }
    end
  end
end


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
    def verify_json(json)
      message = 6
      logger.debug "####  JSON #################>>>  #{json.inspect}"
      hash = JSON.parse(json)
      logger.debug "####  HASH>>> #################>>>  #{hash.inspect}"
      return 7 unless is_test_valid? hash

      hash['questions'].each do |q|
        logger.debug "####  Q 20 #################>>>  #{q.inspect}"
        valid_keys = ['status', 'qtype', 'hint', 'explanation', 'question']
        question_fields = q.slice(*valid_keys)
        logger.debug "####  Jquestion_fields #################>>>  #{question_fields.inspect}"
       question = Question.new question_fields
       return 8 unless question.valid?
       q['answers'].each do |ans|
         question.answer.new ans
       end
       return 9 unless question.valid?
      end
      message
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


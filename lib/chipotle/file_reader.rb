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
      hash = JSON.parse(json_string)
      return 7 unless is_test_valid? hash

      hash['questions'].each do |q|
       question_fields = q.slice 'status', 'qtype', 'hint', 'explanation', 'question'
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


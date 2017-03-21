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
      hash = JSON.parse(json_string)
      logger.debug "####  NEW HASH #################>>>  #{hash.inspect}"
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


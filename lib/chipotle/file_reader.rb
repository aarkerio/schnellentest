# coding: utf-8
# frozen_string_literal: true
# Chipotle Software (c) 2016-2017   GPL v3
require 'doc_ripper'

module Chipotle
  module FileReader
    # Extract text from .pdf or .docx file
    def convert_file(file)
      DocRipper::rip(file)
    end

    # Converts json string to hash and verify it, if true save it
    def verify_or_save_json(json, save=false)
      message = save ? 11 : 6
      action  = save ? :save! : :valid?
      hash    = JSON.parse(json)
      attrs   = create_test_attrs(hash)
      test    = Test.new attrs
      return 7  unless test.public_send action
      hash['questions'].each do |q|
        valid_keys = ['status', 'qtype', 'hint', 'explanation', 'question']
        question_fields = q.slice(*valid_keys)
        question_fields[:lang] = hash["lang"]
        question = Question.new question_fields
        return 8 unless test.question.public_send action  # question validation fails
        case question_fields["qtype"]
        when "1"
          q['answers'].each do |ans|
            new_answer = question.answer.new ans
            result = new_answer.public_send action
            return 9 unless new_answer.public_send action
          end
        when "3"
          q['answers'].each do |com_answer|
            new_answer = question.composite_answer.new com_answer
            return 10 unless new_answer.public_send action
          end
        end
      end
      message
    end

    # it Selects only the fields that we need
    def create_test_attrs(hash)
      {
        title:        hash['title'],
        description:  hash['description'],
        instructions: hash['instructions'],
        level:        hash['level'],
        lang:         hash['lang'],
        tags:         hash['tags'],
        origin:       hash['origin']
      }
    end

    # Just an initial string as template
    def json_string(origin)
      %{ { "title": "Some title",
        "description": "Some description",
        "instructions": "",
        "level": "1",
        "lang": "en",
        "origin": "#{origin}",
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


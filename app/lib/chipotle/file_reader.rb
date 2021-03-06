# coding: utf-8
# frozen_string_literal: true
# Chipotle Software (c) 2016-2020  MIT License
require 'doc_ripper'

module Chipotle
  module FileReader
    # Extract text from .pdf or .docx file
    def convert_file(file)
      DocRipper::rip(file)
    end

    def verify_or_save_json(json, user_id, save)
      if save
        save_json(json, user_id)
      else
        verify_json(json, user_id)
      end
    end

    # Converts json string to hash and verify it, if true save it
    # qtype column:   1: multiple option, 2: open, 3: true/false, 4: fullfill, 5: composite questions
    # TODO: qtype 3 and 4  qtypes question
    def verify_json(json, user_id)
      message = 6
      hash    = JSON.parse(json)
      attrs   = create_test_attrs(hash, user_id)
      return 7  unless Test.new(attrs).valid?
      hash['questions'].each do |q|
        valid_keys = ['status', 'qtype', 'hint', 'explanation', 'question']
        question_fields = q.slice(*valid_keys)
        question_fields[:lang] = hash['lang']
        return 8 unless Question.new(question_fields).valid?  # question validation fails
        logger.debug "####  question_fields #################>>>  #{question_fields.inspect}"
        if question_fields['qtype'].to_i < 5
          next unless q.key? 'answers'
          q['answers'].each do |ans|
            logger.debug "####  answer #################>>>  #{ans.inspect}"
            return 9 unless Answer.new(ans).valid?
          end
        else   # Composite, multiple columns
          q['answers'].each do |com_answer|
            return 10 unless CompositeAnswer.new(com_answer).valid?
          end
        end
      end
      message
    end

    # Save JSON -> create a new test
    def save_json(json, user_id)
      message = 11
      hash    = JSON.parse(json)
      attrs   = create_test_attrs(hash, user_id)
      test    = Test.new(attrs)
      return 7  unless test.save!   # test validation fails
      hash['questions'].each do |q|
        valid_keys = ['status', 'qtype', 'hint', 'explanation', 'question']
        question_fields = q.slice(*valid_keys)
        question_fields[:lang]    = hash['lang']
        question_fields[:user_id] = user_id
        question = Question.new question_fields
        return 8 unless question.save!    # question validation fails
        test.question_tests.create! question_id: question.id
        if question_fields['qtype'].to_i < 5
          next unless q.key? 'answers'
          q['answers'].each do |ans|
            new_answer = question.answer.new ans
            return 9 unless new_answer.save!  # answer validation fails
          end
        else
          q['answers'].each do |com_answer|
            new_answer = question.composite_answer.new com_answer
            return 10 unless new_answer.save!  # answer validation fails
          end
        end
      end
      message
    end

    # it Selects only the fields that we need
    def create_test_attrs(hash, user_id)
      {
        title:        hash['title'],
        description:  hash['description'],
        instructions: hash['instructions'],
        level:        hash['level'],
        lang:         hash['lang'],
        tags:         hash['tags'],
        origin:       hash['origin'],
        user_id:      user_id
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
               { "answer": "", "correct": "false" },
               { "answer": "", "correct": "false" }
            ]
         }
        ] }
      }
    end
  end
end


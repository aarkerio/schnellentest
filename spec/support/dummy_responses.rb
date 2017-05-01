# coding: utf-8
# frozen_string_literal: true
module DummyResponses
  def self.json_test(wrong_json=false, test=false, question=false, answer=false)
    json = %{
             { "title": "English Test",
               "description": "Some description",
               "instructions": "",
               "level": "1",
               "lang": "en",
               "tags": "tag_one ,tag_two",
               "status": "1",
               "questions": [
                  {
                    "status": "1",
                    "qtype" : "1",
                    "hint" : "First Some hint",
                    "explanation": "",
                    "question": "First Some question",
                    "answers": [
                      { "answer": "Answer one", "correct": "false" },
                      { "answer": "Answer two", "correct": "true" }
                    ]
                  },
                  {
                    "status": "1",
                    "qtype" : "2",
                    "hint" : "First Some hint",
                    "explanation": "",
                    "question": "First Some question"
                  },
                  {
                    "status": "1",
                    "qtype" : "3",
                    "hint" : "Second Some hint",
                    "explanation": "",
                    "question": "Second Some question",
                    "answers": [
                      { "name_column": "A", "first_column": "CDMX",          "second_column": "Chile",     "correct_column": "B" },
                      { "name_column": "B", "first_column": "Santiago",      "second_column": "Argentina", "correct_column": "C" },
                      { "name_column": "C", "first_column": "Buenos Aires",  "second_column": "Colombia",  "correct_column": "E" },
                      { "name_column": "D", "first_column": "Montevideo",    "second_column": "Uruguay",   "correct_column": "D" },
                      { "name_column": "E", "first_column": "Bogotá",        "second_column": "México",    "correct_column": "A" }
                    ]
                  },
                  {
                    "status": "1",
                    "qtype" : "1",
                    "hint" : "Second Some hint",
                    "explanation": "",
                    "question": "Second Some question",
                    "answers": [
                      { "answer": "Second Answer one", "correct": "false" },
                      { "answer": "Answer two", "correct": "true" }
                    ]
                  }
                ]
             }
            }

    json << "add some garbage in the string to test the JSON parser" if wrong_json
    json.slice! "English Test"                                       if test
    json.slice! "First Some question"                                if question
    json.slice! "Answer one"                                         if answer

    ActionController::Parameters.new json: json
  end

end

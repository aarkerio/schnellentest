# frozen_string_literal: true
module DummyResponses
  def self.json_test
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
                    "answer": [
                      { "answer": "Answer one", "correct": "false" },
                      { "answer": "Answer two", "correct": "true" }
                    ]
                  },
                  {
                    "status": "1",
                    "qtype" : "1",
                    "hint" : "Second Some hint",
                    "explanation": "",
                    "question": "Second Some question",
                    "answer": [
                      { "answer": "Second Answer one", "correct": "false" },
                      { "answer": "Answer two", "correct": "true" }
                    ]
                  }
                ]
             }
            }

    ActionController::Parameters.new json: json
  end

end

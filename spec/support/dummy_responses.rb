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

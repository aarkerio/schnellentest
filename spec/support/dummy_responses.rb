# coding: utf-8
module DummyResponses
  # Public. Create a JSON String.
  # qtype 1: multiple option, 2: open, 3: true/false, 4: fullfill, 5: composite questions
  # wrong_json  =  Add a JSON at the tail making the string not a valid JSON
  # test        =  Removes a test string making Test model validation fails
  # question    =  Removes a question string making Question model validation fails
  # answer      =  Removes an answer string making Answer model validation fails
  # composite_answer = defines if I rempove answer string from type qtype 1 or 3
  # Returns String
  def self.json_test(wrong_json=false, test=false, question=false, answer=false, composite_answer=false)
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
                    "qtype" : "5",
                    "hint" : "Second Some hint composite question",
                    "explanation": "Some explanation",
                    "question": "Second Some question is a composite question",
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

    json << "add some garbage into the string to test the JSON parser" if wrong_json
    json.slice! "English Test"                                         if test
    json.slice! "First Some question"                                  if question
    json.slice! "Answer one"                                           if answer && !composite_answer
    json.slice! "Colombia"                                             if answer && composite_answer
    ActionController::Parameters.new json: json
  end

end

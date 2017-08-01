#  Chipotle Software (c) 2016-2017 MIT License
class Import < ApplicationRecord
  belongs_to :user

  self.per_page = 4

  mount_uploader :file, JsonFileUploader

  def import_json
    json = nil
    tmp = file.to_s
    begin
      File.open(file.to_s, "r:bom|utf-8"){|f|   json = JSON.parse(f.read) }
    rescue
      logger.debug "####  erorr with file #######>>>  #{tmp}"
      return false
    end
    new_test json
  end

  private

  def new_test(hash)
    questions = 0
    test  = Test.create! title: hash['title'],  description: hash['description'], active: true, shared: true, user_id: user_id
    hash['questions'].each do |q|
      questions  += 1
      question = Question.create! user_id: user_id, question: q['question'], hint: q['hint'], explanation: q['explanation'], tags: q['tags'], worth: 1
      q['answers'].each do |a|
        Answer.create! answer: a['answer'], correct: a['correct'],  question_id: question.id
      end
      TestQuestion.create! test_id: test.id, question_id: question.id
    end
    questions
  end

end

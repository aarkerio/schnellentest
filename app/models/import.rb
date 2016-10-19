#  Chipotle Software (c) 2016   MIT License
class Import < ApplicationRecord
  belongs_to :user

  mount_uploader :file, JsonFileUploader

  def import_json(params)
    file = params[:file]
    self.oname = file.original_filename
    logger.debug "####  params #################>>>  #{file.inspect}"
    file.tempfile.path
    insert_questions(file_name)
    # save!
  end

  private

  def insert_questions(file_name)
    data_hash = JSON.parse(file)
    json = nil
    begin
      File.open('vendor/assets/tests/biologia_1.json', "r:bom|utf-8"){|file|   json = JSON.parse(file.read) }
    rescue
      logger.debug "####  erorr with file #######>>>  #{file_name}"
      return false
    end
    new_test json
  end

  def new_test(hash)
    user_id = params[:user_id]
    test  = Test.create! title: hash[:title],  description: hash[:description], active: true, shared: true, user_id: user_id
    hash[:questions].each do |q|
      question = Question.create! user_id: user_id, question: ipsum, hint: ipsum, explanation: ipsum, tags: ipsum, worth: 1
      if hash[:answers].length > 0
        Answer.create! answer: 'This is the Answer 1111', correct: true,  question_id: q1.id
      end
      TestQuestion.create! test_id: test.id, question_id: question.id
    end

  end

end

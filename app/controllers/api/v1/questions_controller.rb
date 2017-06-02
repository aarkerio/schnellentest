# Chipotle Software (c) 2016-2017  MIT License
module Api
module V1
  class QuestionsController < ApiBaseController
    before_action :set_question, only: [:edit, :update]

    # Gets one Question.  POST /api/v1/questions/get_one/
    #
    # Returns a json object.
    def get_one
      question_data = Question.new.get_one( params[:id] )
      return render json: question_data
    end

    # Creates a new Question. POST /api/v1/questions/create
    #
    # Returns a JSON object.
    def create
      result = Question.new.create_question(question_params)
      if result
        return render json: {message: 'Question was created succesfully', error: false}
      else
        return render json: {message: 'Error: Question was not created succesfully', error: true}
      end
    end

    # Updates a new Question. POST /api/v1/questions/update
    #
    # Returns a Question object.
    def update
      @question = Account.new.update_question(question_params)
      if @question
        return render json: {message: 'Question was created succesfully', error: false}
      else
        return render json: {message: 'Error: Question was not created succesfully', error: true}
      end
    end

    # Public. Disable question. DELETE /api/v1/questions/delete
    #
    #
    # Returns a json response.
    def delete
      question = QuestionTest.where(test_id: params[:test_id], question_id: params[:id])
      if question.delete_all
        return render json: {message: 'Question was removed succesfully.', error: false}
      else
        return render json: {message: 'Error: Something went wrong. Question was not removed.', error: true}
      end
    end

    private

    # Never trust parameters from the scary internet, only allow the white list.
    def question_params
      params.require(:question).permit(:id, :user_id, :question, :explanation, :tags, :hint, :worth, :active, :qtype, :test_id)
    end

    def question
      @question ||= Question.find(params[:id])
    end

    def set_question
      @question = Question.find(params[:id])
    end
  end
end
end

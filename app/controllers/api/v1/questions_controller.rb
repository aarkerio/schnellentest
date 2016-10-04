# Chipotle Software (c) 2016  MIT License
module Api
module V1
  class QuestionsController < ApiBaseController
    before_action :set_question, only: [:edit, :update, :delete]
    
    # Gets all Questions. POST /api/v1/questions/listing/(:guid) route
    #
    # Returns a json object.
    def listing
      #return render json: params.to_json
      fail ActiveRecord::RecordNotFound, 'Question not found one'  if params[:guid].blank?
      
      questions = Question.where( user_id: params[:guid] )   
      all   = QuestionSerializer.new.all_question(questions)
      return render json: all.as_json
      fail ActiveRecord::RecordNotFound, 'Question not found two'  if @question.nil?
    end
    
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
      question = TestQuestion.where(test_id: params[:test_id], question_id: params[:id]).first
      result = question.destroy
      if result
          return render json: {message: 'Question was removed succesfully.'}
      else
         return render json: {message: 'Error: Something went wrong. Question was not removed.'}
      end
    end

    private

    # Never trust parameters from the scary internet, only allow the white list.
    def question_params
      params.require(:question).permit(:user_id, :question, :explanation, :tags, :hint, :worth, :active, :qtype, :test_id)
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

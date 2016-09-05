module Api
module V1
  class QuestionsController < ApiBaseController
    #before_action :set_question, only: [:show, :edit, :update, :destroy] 
    
    # Gets all Questions. POST /api/v1/questions/listing/(:guid) route
    #
    # guid  - The guid String.
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
    # guid  - The guid String.
    #
    # Returns a json object.
    def get_one
      question_data = Question.get_one( params[:id] )
      return render json: question_data
    end

    # Creates a new Question Account.
    #
    # Returns a JSON object.
    def create
      # return render json: params.to_json
      
      result = Question.new.create_question(params)

      if result
        return render json: {message: 'Question was created succesfully'} 
      else
        return render json: {message: 'Question was not created succesfully'}
      end
    end

    # Creates a new Question Account.
    #
    # Returns a Question object.
    def update
      #return render json: Question_params.to_json
      if Question_params[:guid].blank?
        return fail ActiveRecord::RecordNotFound, 'Question not found'
      end

      @question = Account.new.update_Question(Question_params)

      if @question.class.name == 'Question'
          @message = { message: 'Question updated sucessfully' }
      else
          fail Exception, "Question not updated: #{@question.inspect}"
      end
      render 'index'
    end

    # Disable an Account.
    #
    # text  - The guid String.
    #
    # Examples
    #
    #   show('xVpK6SgP2NAhVtA-ygEIww')
    #   # => Question
    #
    # Returns a Question object.
    def delete
        #return render json: params.to_json
        return fail ActiveRecord::RecordNotFound, 'Question not found'  if params[:id].blank?
        question = Question.find(params[:id])
        result = question.destroy

        if result
          return render json: {message: 'Question was removed succesfully.'}
        else
          return render json: {message: 'Something went wrong. Question was not removed.'}
        end
      end

      private

      # Never trust parameters from the scary internet, only allow the white list.
      def question_params
        params.require(:Question).permit(:user_id, :title, :description, :tags, :active, :shared)
      end
      
      def question
        @question ||= Question.find(params[:id])
      end

      def serializer
        @serializer ||= QuestionSerializer.new(question)
      end
      
      def set_question
        @question = Question.find(params[:id])
      end
    end
end
end

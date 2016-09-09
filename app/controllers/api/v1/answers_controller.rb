module Api
module V1
  class AnswersController < ApiBaseController

    # Creates a new Answer Account.
    #
    # Returns a JSON object.
    def create      
      answer = Answer.new(answer_params)
     
      if answer.save
        return render json: {message: 'Answer was created succesfully'} 
      else
        return render json: {message: 'Error: Answer was not created succesfully'}
      end
    end

    # Creates a new Answer Account.
    #
    # Returns a Answer object.
    def update
      #return render json: Answer_params.to_json
      if Answer_params[:guid].blank?
        return fail ActiveRecord::RecordNotFound, 'Answer not found'
      end

      @answer = Account.new.update_Answer(Answer_params)

      if @answer.class.name == 'Answer'
          @message = { message: 'Answer updated sucessfully' }
      else
          fail Exception, "Error: Answer not updated: #{@answer.inspect}"
      end
      render 'index'
    end

    # Disable an Answer.
    #
    # text  - The guid String.
    #
    # Examples
    #
    #   show('xVpK6SgP2NAhVtA-ygEIww')
    #   # => Answer
    #
    # Returns a Answer object.
    def delete
      if @answer.destroy
        return render json: {message: 'Answer was removed succesfully.'}
      else
        return render json: {message: 'Error :Something went wrong. Answer was not removed.'}
      end
    end

    private

    # Never trust parameters from the scary internet, only allow the white list.
    def answer_params
        params.require(:answer).permit(:answer, :active, :correct, :question_id)
    end
    
  end
end
end

module Api
module V1
  class AnswersController < ApiBaseController
    before_action :set_answer, only: [:toggle, :update, :destroy]
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
      if @answer.update_attribute(:answer, params[:answer])
        return render json: {message: 'Answer was updated succesfully'} 
      else
        return render json: {message: 'Error: Answer was not updated succesfully'}
      end
    end
    # Toggle one field
    def toggle
      if @answer.update_attribute(:status,params[:status])
        return render json: {message: 'Answer was toggled succesfully'} 
      else
        return render json: {message: 'Error: Answer was not created succesfully'}
      end
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

    def set_answer
      @answer = Answer.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list.
    def answer_params
        params.require(:answer).permit(:answer, :active, :correct, :question_id)
    end
    
  end
end
end

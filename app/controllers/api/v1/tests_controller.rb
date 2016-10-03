# Chipotle Software (c) 2016  MIT License
module Api
module V1
  class TestsController < ApiBaseController
    before_action :set_test, only: [:get_one, :update, :toggle, :delete, :search, :linking] 
    
    # Gets all Tests. POST /api/v1/tests/listing/
    #
    # Returns a json object.
    def listing
      params = test_params
      tests = Test.where( user_id: params[:user_id] ) 
      all   = TestSerializer.new.all_test(tests)
      return render json: all.as_json
    end

    # Gets one Test.  POST /api/v1/tests/get_one/ 
    #
    # Returns a json object.
    def get_one
      test_data = @test.get_one
      return render json: test_data
    end

    # Creates a new Test Account.
    #
    # Returns a JSON object.
    def create
      # return render json: params.to_json
      
      result = Test.new.create_test(test_params)

      if result
        return render json: {message: 'Test was created succesfully'} 
      else
        return render json: {message: 'Error: Test was not created succesfully'}
      end
    end

    # Creates a new Test.
    #
    # Returns JSON.
    def update
      if @answer.update_attribute(:answer, params[:answer])
        return render json: {message: 'Answer was updated succesfully'} 
      else
        return render json: {message: 'Error: Answer was not updated succesfully'}
      end
    end

    # Linking questions with test.
    #
    # Returns a JSON object.
    def linking
      result = @test.link_questions(params[:question_ids])
      if result
        return render json: {message: 'Error: Question was not created succesfully'} 
      else     
        return render json: {message: 'Question was created succesfully'}
      end
    end

    # Toggle one field
    def toggle
      if @answer.update_attribute(:status, params[:status])
        return render json: {message: 'Answer was toggled succesfully'} 
      else
        return render json: {message: 'Error: Answer was not created succesfully'}
      end
    end
    
    # Disable one Answer.
    #
    # Returns a Answer object.
    def delete
      if @answer.destroy
        return render json: {message: 'Answer was removed succesfully.'}
      else
        return render json: {message: 'Error :Something went wrong. Answer was not removed.'}
      end
    end

    # Gets questons by subject. POST /api/v1/tests/search/
    #
    # Returns a json object.
    def search
      results = @test.search(params[:terms]) 
      return render json: results.as_json
    end

    private

    # Never trust parameters from the scary internet, only allow the white list.
    def test_params
      params[:test][:question_ids] ||= []
      params.require(:test).permit(:user_id, :title, :description, :tags, :active, :shared, question_ids: [])
    end

    def serializer
      @serializer ||= TestSerializer.new(test)
    end
      
    def set_test
      @test = Test.find(params[:id])
    end
  end
end
end

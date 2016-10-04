# Chipotle Software (c) 2016  MIT License
module Api
module V1
  class TestsController < ApiBaseController
    before_action :set_test, only: [:get_one, :update, :toggle, :delete, :search, :linking, :reorder] 
    
    # Gets all Tests. POST /api/v1/tests/listing/
    #
    # Returns a json object.
    def listing
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

    # Reorder queston in the test.  PATCH /api/v1/questions/reorder 
    #
    # Returns a json object.
    def reorder
      result = @test.reorder(question_params)
      if result
        return render json: {message: 'Question was sorted succesfully', error: false} 
      else
        return render json: {message: 'Error: Question was not sorted succesfully', error: true}
      end
    end

    # Creates a new Test Account. POST /api/v1/tests/create 
    #
    # Returns a JSON object.
    def create
      result = Test.new.create_test(test_params)
      if result
        return render json: {message: 'Test was created succesfully', error: false} 
      else
        return render json: {message: 'Error: Test was not created succesfully', error: true}
      end
    end

    # Updates a new Test.POST /api/v1/tests/update 
    #
    # Returns JSON.
    def update
      if @test.update_attribute(:answer, params[:answer])
        return render json: {message: 'Test was updated succesfully', error: false} 
      else
        return render json: {message: 'Error: Test was not updated succesfully', error: true}
      end
    end

    # Linking questions with test.
    #
    # Returns a JSON object.
    def linking
      result = @test.link_questions(params[:question_ids])
      if result
        return render json: {message: 'Error: Question was not created succesfully', error: true} 
      else     
        return render json: {message: 'Question was created succesfully', error: false}
      end
    end

    # Toggle one field
    def toggle
      if @test.update_attribute(:status, params[:status])
        return render json: {message: 'Test was toggled succesfully', error: false} 
      else
        return render json: {message: 'Error: Test was not created succesfully', error: true}
      end
    end

    # Gets questons by subject. POST /api/v1/tests/search/
    #
    # Returns a json object.
    def search
      results = @test.search(params[:terms]) 
      return render json: results
    end

    # Disable one Test.
    #
    # Returns a Test object.
    def delete
      if @test.destroy
        return render json: {message: 'Test was removed succesfully.', error: false}
      else
        return render json: {message: 'Error :Something went wrong. Test was not removed.', error: true}
      end
    end
    private

    # Never trust parameters from the scary internet, only allow the white list.
    def test_params
      params[:test][:question_ids] ||= []
      params.require(:test).permit(:user_id, :title, :description, :tags, :active, :shared, :way, question_ids: [])
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

module Api
module V1
  class TestsController < ApiBaseController
  
    #before_action :set_test, only: [:show, :edit, :update, :destroy]
    
    # Shows all Test. /api/v1/tests/listing/(:guid) route
    #
    # guid  - The guid String.
    #
    # Returns a json object.
    def listing
      #return render json: params.to_json
      fail ActiveRecord::RecordNotFound, 'Test not found one'  if params[:guid].blank?
      
      tests = Test.where( user_id: params[:guid] )   
      all   = TestSerializer.new.all_test(tests)
      return render json: all.as_json
      fail ActiveRecord::RecordNotFound, 'Test not found two'  if @test.nil?
    end

    # Shows all Test. /api/v1/tests/listing/(:guid) route
    #
    # guid  - The guid String.
    #
    # Returns a json object.
    def get_one
      #return render json: params.to_json
      fail ActiveRecord::RecordNotFound, 'Test not found one'  if params[:id].blank?
      
      return render json: serializer.as_json
      fail ActiveRecord::RecordNotFound, 'Test not found two'  if @test.nil?
    end

      # Creates a new Test Account.
      #
      # Returns a Test object.
      def create
        #return render json: Test_params.to_json
        @test = Account.new.create_Test(Test_params)
        if @test.class.name == 'Test'
          @message = { message: 'Test created sucessfully' }
        else
          fail Exception, "Test not created: #{@test.inspect}"
        end
        render 'index'
      end

      # Creates a new Test Account.
      #
      # Returns a Test object.
      def update
        #return render json: Test_params.to_json
        if Test_params[:guid].blank?
          return fail ActiveRecord::RecordNotFound, 'Test not found'
        end

        @test = Account.new.update_Test(Test_params)

        if @test.class.name == 'Test'
          @message = { message: 'Test updated sucessfully' }
        else
          fail Exception, "Test not updated: #{@test.inspect}"
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
      #   # => Test
      #
      # Returns a Test object.
      def delete
        #return render json: params.to_json
        return fail ActiveRecord::RecordNotFound, 'Test not found'  if params[:guid].blank?

        result = Test.new.destroy(params[:guid])

        if result
          @message = { message: 'Test sucesfully deleted'}
        else
          @message = { message: 'Something went wrong, Test not deleted'}
        end
      end

      private

      # Never trust parameters from the scary internet, only allow the white list.
      def test_params
        params.require(:Test).permit(:user_id, :title, :description,  :active, :shared)
      end
      
      def test
        @test ||= Test.find(params[:id])
      end

      def serializer
        @serializer ||= TestSerializer.new(test)
      end
      
      # Use callbacks to share common setup or constraints between actions.
      def set_test
        @test = Test.find(params[:id])
      end
    end
end
end

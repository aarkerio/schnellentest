module Api
module V1
  class TestsController < ApiBaseController
    # Shows all Test. /api/v1/tests/listing/(:guid) route
    #
    # guid  - The guid String.
    #
    # Returns a json object.
    def listing
      #return render json: params.to_json
      fail ActiveRecord::RecordNotFound, 'Test not found one'  if params[:guid].blank?
      tests = Test.where( user_id: params[:guid] )   
      all = TestSerializer.new.all_test(tests)
      return render json: all.as_json
      fail ActiveRecord::RecordNotFound, 'Test not found two'  if @test.nil?
    end

    # Shows all Test. /api/v1/tests/listing/(:guid) route
    #
    # guid  - The guid String.
    #
    # Returns a json object.
    def getone
      #return render json: params.to_json
      fail ActiveRecord::RecordNotFound, 'Test not found one'  if params[:id].blank?
      
      return render json: serializer.as_json
      fail ActiveRecord::RecordNotFound, 'Test not found two'  if @test.nil?
    end

      # Creates a new Test Account.
      #
      # Returns a Test object.
      def create_Test
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
      def update_Test
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

      # Shows an Test.
      #
      # text  - The guid String.
      #
      # Returns a Test object.
      def get_guid
        #return render json: 'gettoken'
        #customer_profile_external_id
        @test  = Account.get_guid(Test_params)

        if @test.nil?
          fail ActiveRecord::RecordNotFound, 'Test not found'
        end

        render 'index'
      end

      # Create a guid for the Account.
      #
      # text  - The guid String.
      #
      # Returns a Test object.
      def create_guid
        @test = Account.create_token(Test_params)

        fail ActiveRecord::RecordNotFound, 'Test not found'  if @test.nil?

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
        if params[:guid].blank?
          return fail ActiveRecord::RecordNotFound, 'Test not found'
        end

        result = Account.new.disable_Test(params[:guid])

        if result
          @message = { message: 'Test sucesfully deleted'}
        else
          @message = { message: 'Something went wrong, Test not deleted'}
        end
      end

      def errorr(error_name)
        errors_by_name = { not_valid_Test: { code: '2', message: 'Not valid Account.' },
                         register_error: { code: '3', message: 'Test could not be found in subscriptions.' },
                         epub_Test:      { code: '4', message: 'Test could not be found in IBJ.' },
                         connection:     { code: '5', message: 'Connection could not be established.' }
                       }

        errors_by_name[error_name]
      end

      private

      # Never trust parameters from the scary internet, only allow the white list.
      def test_params
        params.require(:Test).permit(:fname, :lname, :uname, :email, :passwd, :guid)
      end
      
      def test
        @test ||= Test.find(params[:id])
      end

      def serializer
        @serializer ||= TestSerializer.new(test)
      end
      
      # Use callbacks to share common setup or constraints between actions.
      #def set_Test
      #  @test = Test.find(params[:id])
      #end
    end
end
end

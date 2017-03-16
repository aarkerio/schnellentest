# Chipotle Software (c) 2016-2017  MIT License
module Api
module V1
  class UsersController < ApiBaseController

    # Shows a user. /users/getinfo route
    #
    # text  - The guid String.
    #
    # Returns a User object.
    def index
        #return render json: params.to_json
        fail ActiveRecord::RecordNotFound, 'User not found one'  if params[:guid].blank?
        @user  = Account.get_user(params[:guid])

        fail ActiveRecord::RecordNotFound, 'User not found two'  if @user.nil?
    end

    # Creates a new user Account.
    #
    # Returns a User object.
    def create_user
        #return render json: user_params.to_json
        @user = Account.new.create_user(user_params)
        if @user.class.name == 'User'
          @message = { message: 'User created sucessfully' }
        else
          fail Exception, "User not created: #{@user.inspect}"
        end
        render 'index'
    end

    # Creates a new user Account.
    #
    # Returns a User object.
    def update_user
        #return render json: user_params.to_json
        if user_params[:guid].blank?
          return fail ActiveRecord::RecordNotFound, 'User not found'
        end

        @user = Account.new.update_user(user_params)

        if @user.class.name == 'User'
          @message = { message: 'User updated sucessfully' }
        else
          fail Exception, "User not updated: #{@user.inspect}"
        end
        render 'index'
      end

      # Shows an user.
      #
      # text  - The guid String.
      #
      # Returns a User object.
      def get_guid
        #return render json: 'gettoken'
        #customer_profile_external_id
        @user  = Account.get_guid(user_params)

        if @user.nil?
          fail ActiveRecord::RecordNotFound, 'User not found'
        end

        render 'index'
      end

      # Create a guid for the Account.
      #
      # text  - The guid String.
      #
      # Returns a User object.
      def create_guid
        @user = Account.create_token(user_params)

        fail ActiveRecord::RecordNotFound, 'User not found'  if @user.nil?

        render 'index'
      end

      # Disable an Account.
      #
      # text  - The guid String.
      #
      # Examples
      #
      #   show('xVpK6SgP2NAhVtA-ygEIww')
      #   # => user
      #
      # Returns a User object.
      def delete
        #return render json: params.to_json
        if params[:guid].blank?
          return fail ActiveRecord::RecordNotFound, 'User not found'
        end

        result = Account.new.disable_user(params[:guid])

        if result
          @message = { message: 'User sucesfully deleted'}
        else
          @message = { message: 'Something went wrong, user not deleted'}
        end
      end

      def errorr(error_name)
        errors_by_name = { not_valid_user: { code: '2', message: 'Not valid Account.' },
                         register_error: { code: '3', message: 'User could not be found in subscriptions.' },
                         epub_user:      { code: '4', message: 'User could not be found in IBJ.' },
                         connection:     { code: '5', message: 'Connection could not be established.' }
                       }

        errors_by_name[error_name]
      end

      private

      # Never trust parameters from the scary internet, only allow the white list through.
      def user_params
        params.require(:user).permit(:fname, :lname, :uname, :email, :passwd, :guid)
      end

      # Use callbacks to share common setup or constraints between actions.
      #def set_user
      #  @user = User.find(params[:id])
      #end
    end
end
end

class Api::V1::UsersController < ApplicationController
    def create
        user = User.new(user_params)

        if user.save
            render json: user
        else 
            render json: { error: user.errors.messages }, status: 422
        end
    end

    private

    def user_params
        params.require(:user).permit(:display_name)
    end
end        
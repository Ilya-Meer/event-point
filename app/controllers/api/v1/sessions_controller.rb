class Api::V1::SessionsController < ApplicationController
    def create
        user = User.find_by(email: params[:user][:email])
        if user && user.authenticate(params[:user][:password])
            session[:user_id] = user.id
            render json: {
                status: :ok,
                logged_in: true,
                user: user
            }
        else
            head :unauthorized
        end
    end

    def logged_in
        if @current_user
            render json: {
                logged_in: true,
                user: @current_user
            }
        else
            render json: {
                logged_in: false
            }
        end
    end

    def logout
        reset_session
        render json: {
            status: :ok,
            logged_out: true
        }
    end
end
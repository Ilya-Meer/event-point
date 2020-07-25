class Api::V1::VotesController < ApplicationController
    def create
        vote = Vote.new(vote_params)

        if vote.save
            render json: vote
        else 
            render json: { error: vote.errors.messages }, status: 422
        end
    end

    def destroy
        Vote.find_by(user_id: params[:user_id], event_id: params[:event_id]).destroy
    end

    private

    def vote_params
        params.require(:vote).permit(:user_id, :event_id)
    end
end

class Api::V1::EventsController < ApplicationController
    before_action :is_authenticated?

    def index
        events = Event.all.includes(:votes)
        with_votes = events.map do |event|
            event_copy = event.as_json

            votes = event.votes.map do |vote|
                user = vote.user

                vote_copy = {
                    user_id: user[:id],
                    display_name: user[:display_name],
                    email: user[:email]
                }

                vote_copy
            end

            event_copy["votes"] = votes.present? ? votes : []
            event_copy
        end

        #update last-modified so content is always fresh
        headers['Last-Modified'] = Time.now.httpdate

        render json: with_votes
    end

    def show
        event = Event.find(params[:id])
        render json: event
    end

    def create
        event = Event.new(event_params)

        if event.save
            render json: event
        else 
            render json: { error: event.errors.messages }, status: :unprocessable_entity
        end
    end

    def update
        event = Event.find(params[:id])

        if event.update(event_params)
            render json: event
        else 
            render json: { error: event.errors.messages }, status: :unprocessable_entity
        end
    end

    def destroy
        event = Event.find(params[:id])

        if event.destroy
            head :no_content
        else 
            render json: { error: event.errors.messages }, status: :unprocessable_entity
        end
    end

    private

    def event_params
        params.require(:event).permit(:topic, :description, :owner_id)
    end
end
module Api
    module V1
        class EventsController < ApplicationController
            def index
                events = Event.all

                render json: events
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
                    render json: { error: event.errors.messages }, status: 422
                end
            end

            def update
                event = Event.find(params[:id])
        
                if event.update(event_params)
                    render json: event
                else 
                    render json: { error: event.errors.messages }, status: 422
                end
            end
        
            def destroy
                event = Event.find(params[:id])

                if event.destroy
                    head :no_content
                else 
                    render json: { error: event.errors.messages }, status: 422
                end
            end

            private
        
            def event_params
              params.require(:event).permit(:topic, :description, :user_id)
            end
        end
    end
end
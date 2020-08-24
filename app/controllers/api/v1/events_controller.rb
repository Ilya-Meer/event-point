class Api::V1::EventsController < ApplicationController
    before_action :is_authenticated?

    def index
        events = Event.all.includes(:votes)
        with_votes = events.map do |event|
            event_copy = event.as_json

            # fetch event creator info
            event_owner = User.find(event.owner_id)
            if event_owner.display_name.present?
                event_copy["owner"] = event_owner.display_name
            else
                event_copy["owner"] = event_owner.email
            end

            # fetch vote info
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

    def event_schedule
        render json: convert_to_schedule(Event.where.not(datetime: nil))
    end

    def schedule_event
        error, event = retrieve_event([:event_id, :datetime])
        if error.present?
            render json: { error: error }, status: :unprocessable_entity
            return
        end

        scheduled_date = DateTime.parse(params[:datetime]).to_formatted_s(:iso8601)
        event.datetime = scheduled_date
        event.save

        render json: { event_id: params[:event_id], datetime: scheduled_date }
    end

    def unschedule_event
        error, event = retrieve_event([:event_id])
        if error.present?
            render json: { error: error }, status: :unprocessable_entity
            return
        end

        event.datetime = nil
        event.save

        render json: { event_id: params[:event_id] }
    end

    private

    def convert_to_schedule(events)        
        formatted_schedule = events.reduce({}) do |acc, event|
            date = DateTime.parse(event[:datetime].strftime('%F'))
            
            if acc.key?(date)
                acc[date].push(event.as_json)
            else
                acc[date] = [event.as_json]
            end

            acc
        end

        formatted_schedule
    end

    def retrieve_event(fields)
        fields.each do |field|
            if params[field].blank?
                return "Missing required parameter: #{field}", nil
            end
        end

        begin 
            event = Event.find(params[:event_id])
            return nil, event
        rescue
            return "Event not found", nil
        end
    end

    def event_params
        params.require(:event).permit(:topic, :description, :owner_id)
    end
end
class EventsController < ApplicationController
    def index
        @events = Event.all
        render component: 'EventList', props: { events: @events }
    end
end
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :events
      resources :users
      resources :sessions, only: [:create]
      resources :registrations, only: [:create]

      # event schedule
      get :schedule, to: "events#event_schedule"
      patch :schedule_event, to: "events#schedule_event"
      patch :unschedule_event, to: "events#unschedule_event"

      # votes
      post :add_vote, to: "votes#create"
      post :remove_vote, to: "votes#destroy"

      # auth
      delete :logout, to: "sessions#logout"
      get :logged_in, to: "sessions#logged_in"
    end
  end

  root 'pages#index'
  get '*path', to: 'pages#index', via: :all

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

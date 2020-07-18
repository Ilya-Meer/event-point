Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :events
      resources :users
      resources :sessions, only: [:create]
      resources :registrations, only: [:create]

      delete :logout, to: "sessions#logout"
      get :logged_in, to: "sessions#logged_in"
    end
  end

  root 'pages#index'
  get '*path', to: 'pages#index', via: :all

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

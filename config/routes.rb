Rails.application.routes.draw do
  devise_for :users
  post "/graphql", to: "graphql#execute"
  resources :posts
  resources :images
  resources :annals
  resources :groups
  resources :imports
  resources :questions
  resources :tests
  resources :users
  root 'website#info'
  get 'website/welcome'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :v1, defaults: {format: 'json'} do
    get 'teams', to: 'teams#teams'
  end
end

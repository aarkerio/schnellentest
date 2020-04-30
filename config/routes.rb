Rails.application.routes.draw do
  resources :posts
  resources :images
  resources :annals
  resources :groups
  resources :imports
  resources :questions
  resources :tests
  resources :users
  devise_for :user
  root 'website#welcome'
end

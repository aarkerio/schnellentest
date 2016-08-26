#Chipotle Software (c) 2016 MIT License 
Rails.application.routes.draw do

  devise_for :users
  resources :users
  resources :groups do
    collection do
      get 'welcome'
    end
  end
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # You can have the root of your site routed with "root"
  root 'groups#welcome'
end

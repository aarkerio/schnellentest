Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users
  
  resources :users
  
  resources :groups do
    collection do
      get 'welcome'
    end
  end
  
  root 'groups#welcome'
  
end

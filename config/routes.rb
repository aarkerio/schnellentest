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
  
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      # TEST SECTION
      post  '/tests/listing/(/:guid)'=> 'tests#listing', as: 'tests_listing'
      post  '/tests/getone/(/:id)'  => 'tests#getone',  as: 'tests_getone'
      post  '/tests/update/'        => 'tests#update',  as: 'tests_update'
      post  '/tests/create'         => 'tests#create',  as: 'tests_create'
      get   '/tests/delete/(/:id)'  => 'tests#delete',  as: 'tests_delete'
     
      # QUESTION SECTION
      post  '/questions/listing/(/:test_id)' => 'questions#listing', as: 'questions_listing'
      post  '/questions/create/'             => 'questions#create',  as: 'questions_create'
      post  '/questions/update/'             => 'questions#update',  as: 'questions_update'
      post  '/questions/delete/'             => 'questions#delete',  as: 'questions_delete'   
 
      # USER SECTION
      post  '/users/update/' => 'users#update_user', as: 'users_update'
      post  '/users/create' => 'users#create_user', as: 'users_create'
      get   '/users/getinfo(/:guid)' => 'users#index', as: 'users_index'
      get   '/users/delete/(/:guid)' => 'users#delete', as: 'users_delete'
      get   '/users/getguid/' => 'users#get_guid', as: 'users_getguid'
      get   '/users/createguid/' => 'users#create_guid'
      post  '/users/consults(/:guid)' => 'users#consults', as: 'consults'
    end
  end
end

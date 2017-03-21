# coding: utf-8
# frozen_string_literal: true
Rails.application.routes.draw do
  resources :images

  root 'groups#welcome'

  devise_for :users
  resources :users

  resources :annals do
    member do
      get 'download_file'
      get 'edit_json'
      get 'elaboration'
      post 'test'
      post 'export'
    end
  end

  resources :imports do
    member do
      get 'download_file'
    end
  end

  resources :groups do
    collection do
      get 'welcome'
    end
  end

  get '/tests/' => 'tests#index', as: 'tests_index'

  namespace :api, defaults: {format: :json} do
    namespace :v1 do

      post 'authenticate' => 'auth#authenticate'

      # TEST SECTION
      post   '/tests/listing/'         => 'tests#listing', as: 'tests_listing'
      post   '/tests/get_one/'         => 'tests#get_one', as: 'tests_get_one'
      patch  '/tests/update/'          => 'tests#update',  as: 'tests_update'
      post   '/tests/create'           => 'tests#create',  as: 'tests_create'
      delete '/tests/delete/(/:id)'    => 'tests#delete',  as: 'tests_delete'
      post   '/tests/search/'          => 'tests#search',  as: 'tests_search'
      post   '/tests/linking/'         => 'tests#linking', as: 'tests_linking'
      patch  '/tests/reorder/'         => 'tests#reorder', as: 'tests_reorder'

      # QUESTION SECTION
      post   '/questions/listing/(/:id)' => 'questions#listing', as: 'questions_listing'
      post   '/questions/get_one/'       => 'questions#get_one', as: 'questions_get_one'
      post   '/questions/create/'        => 'questions#create',  as: 'questions_create'
      patch  '/questions/update/'        => 'questions#update',  as: 'questions_update'
      delete '/questions/delete/(/:id)/(:test_id)'  => 'questions#delete',  as: 'questions_delete'

      # ANSWER SECTION
      post   '/answers/create/'           => 'answers#create',    as: 'answers_create'
      post   '/answers/get_one/'          => 'answers#get_one',   as: 'answers_get_one'
      patch  '/answers/toggle/'           => 'answers#toggle',    as: 'answers_toggle'
      patch  '/answers/update/'           => 'answers#update',    as: 'answers_update'
      delete '/answers/delete/(/:id)'     => 'answers#delete',    as: 'answers_delete'

      # USER SECTION
      patch  '/users/update/'         => 'users#update_user', as: 'users_update'
      post   '/users/create'          => 'users#create_user', as: 'users_create'
      get    '/users/getinfo(/:guid)' => 'users#index',       as: 'users_index'
      delete '/users/delete/(/:guid)' => 'users#delete',      as: 'users_delete'
      get    '/users/getguid/'        => 'users#get_guid',    as: 'users_getguid'
      get    '/users/createguid/'     => 'users#create_guid'
    end
  end

end

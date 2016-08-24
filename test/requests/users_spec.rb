require 'spec_helper'

describe 'users API' do

  before :each do
    @user = FactoryGirl.create :user
    @env ||= {}
    @env['HTTP_AUTHORIZATION'] = ActionController::HttpAuthentication::Basic.encode_credentials('koalacorp','koalacorp')
  end

  it 'creates or retrieves a guid by email on create_guid action' do
    get "/v1/users/create_guid/?email=#{@user.email}", {}, @env

    expect(response).to be_success
    puts json['data']
    expect(json['data']['UID'].length > 12).to eq true
  end

  it 'creates a new user on create_user action' do
    params = {
      fname: 'John',
      lname: 'Smith',
      email: 'jsonmith66@jmithmx.com',
      uname: 'smith67',
      passwd: 'ASQWert78@@'
    }

    post '/v1/users/create', params, @env

    # test for the 200 status-code
    expect(response).to be_success
    expect(json['data']['email']).to eq 'jsonmith66@jmithmx.com'
    expect(json['data']['UID'].length > 12).to eq true
  end

  it 'updates a user on update_user action' do
    params = {
      guid: @user.guid,
      fname: 'John',
      lname: 'Smith',
      email: 'jsomiith66@66updated.com'
    }

    post '/v1/users/update', params, @env

    # test for the 200 status-code
    expect(response).to be_success
    expect(json['data']['email']).to eq 'jsonmith66@updated.com'
  end

  it 'retrieves a user by email on get_token action' do
    get '/v1/users/gettoken/?email=testo@testonex.com', {}, @env

    expect(response).to be_success
    expect(json['data']['email']).to eq @user.email
  end

  it 'retrieves a user by id on get_token action' do
    get '/v1/users/gettoken/?email=testo@testonex.com', {}, @env

    expect(response).to be_success
    expect(json['data']['id']).to eq @user.id.to_s
  end

  it 'sets a user as active false on delete action' do
     get "/v1/users/delete/#{@user.guid}", {}, @env

    expect(response).to be_success
    expect(json['account']['message']).to eq 'User sucesfully deleted'
  end

end
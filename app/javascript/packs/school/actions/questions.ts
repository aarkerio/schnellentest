import Cookies from 'universal-cookie'

export const RECEIVE_QUESTION  = 'RECEIVE_QUESTION';
export const REQUEST_QUESTION  = 'REQUEST_QUESTION';
export const REQUEST_POSTS     = 'REQUEST_POSTS';

const cookies = new Cookies();

function headers(set_cookie: boolean = false) {
  let headers = {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
  if (set_cookie){
    headers['Authorization'] = "Bearer " + cookies.get('remember_user_token')
  }
  return headers;
}

export const fetchQuestion: any = (user_id: number, active:boolean = true) => async (dispatch: any) => {

  let data: RequestInit = {
      method:      'POST',
      credentials: 'same-origin',
      mode:        'same-origin',
      body:        JSON.stringify({
        user_id: user_id,
        active: active,  // get all
      }),
      headers:     headers(true)
    };

    try {
        const res  = await fetch('/api/v1/tests/listing/', data);
        const response = await res.json();
        const result   = await dispatch(JSON.stringify(response));
        return result;
    } catch (err) {
        console.error('Error loading data: >> ', err.toString());
    }
};


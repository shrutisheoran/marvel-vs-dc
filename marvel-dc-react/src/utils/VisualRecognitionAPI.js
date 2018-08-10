const api = process.env.REACT_APP_CONTACTS_API_URL || 'https://fathomless-headland-21522.herokuapp.com'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
}

export const getInfo = (body) =>
  fetch(`${api}/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
  .catch((err)=>{
    console.log('PLease input a valid image address with .jpg or .png format');
  })
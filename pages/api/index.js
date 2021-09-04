// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export function getUsers(params) {
  let users =  axios.get(`http://localhost:3004/data?_page=${params['page']}&_limit=${params['perPage']}&q=${params['title']}`)
  return users
}

export function getCount(){
  return axios.get('http://localhost:3004/data')
}

export function searchByFirstname(firstname) {
    return axios.get(`http://localhost:3004/data?firstname_like=${firstname}`)
}

export function addUser (user){
  return axios.post('http://localhost:3004/data', user)
}

export function updateUser (id, data){
  return axios.put(`http://localhost:3004/data/${id}`, data);
};

export function removeUser (id){
  return axios.delete(`http://localhost:3004/data/${id}`);
};

export function findById (id){
  return axios.get(`http://localhost:3004/data?id=${id}`);
};

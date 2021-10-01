import axios from 'axios';

// URL FILMES EM CARTAZ
// https://api.themoviedb.org/3/


// exportar a chave api do site
//export const key = ''

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

export default api;
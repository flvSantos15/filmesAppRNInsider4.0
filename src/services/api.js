import axios from 'axios';

// URL FILMES EM CARTAZ
// https://api.themoviedb.org/3/

// movie/now_playing?api_key=6821d21cebc774e0bab5d9b0c6ca5bc9&language=pt-BR&page=1

export const key = '6821d21cebc774e0bab5d9b0c6ca5bc9'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

export default api;
import AsyncStorage from '@react-native-async-storage/async-storage'

//Buscar os filmes salvos
export async function getMoviesSave(key){
  const myMovies = await AsyncStorage.getItem(key)
  //Ou sera uma lista de filmes salvos ou vazia
  let moviesSave = JSON.parse(myMovies) || []
  
  return moviesSave
}

//Salvar um novo filme
export async function saveMovie(key, newMovie){
  //recebo os filmes salvos
  let moviesStorad = await getMoviesSave(key)
  //se tiver algum filme com esse
  const hasMovie = moviesStorad.some( item => item.id === newMovie.id)
  //verifico se o filme que quero salvar ja esta salvo ou não
  if(hasMovie){
    console.log('ESSE FILME JÁ ESTÁ SALVO')
    return
  }
  //se não tiver salvo eu dou um push pra add na lista
  moviesStorad.push(newMovie)

  await AsyncStorage.setItem(key, JSON.stringify(moviesStorad))
  console.log('FILME SALVO COM SUCESSO')
}

//Deletar algum filme especifico
export async function deleteMovie(id){
  //recebo os filmes salvos
  //a chave dentro da função é a mesma passada no Detail componente
  let moviesStorad = await getMoviesSave('@primereact')
  //agora filtro para encontrar o filme com o id passado
  let myMovies = moviesStorad.filter(item => {
    //retorne todos os itens menos o que vc clicou
    return(item.id !== id)
  })
  await AsyncStorage.setItem('@primereact', JSON.stringify(myMovies))
  console.log('Filme deletado com sucesso')
  return myMovies
}

//Filtrar algum filme se já esta salvo
export async function hasMovie(movie){
  //recebo os filmes salvos
  let moviesStorad = await getMoviesSave('@primereact')
  //verificar se o id que do filme clicado ja existe na lista
  //vou procurar dentro da lista de filmes
  const hasMovie = moviesStorad.find( item => item.id === movie.id)
  //se existe o filme é vdd
  if(hasMovie){
    return true
  }
  // se não é mentira
  return false
  //se existe alertar o cliente
}
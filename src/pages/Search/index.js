import React, { useState, useEffect } from 'react';
import { Container, ListMovies } from './styles'

import api, {key} from '../../services/api'
import SearchItem from '../../components/SearchItem'

import { useNavigation, useRoute} from '@react-navigation/native'

export default function Search(){
  const [movie, setMovie] = useState([])
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()
  const route = useRoute()

  useEffect(() => {
    let isActive = true

    async function getSearchMovie(){
      //faço a busca na api
      const response = await api.get('/search/movie', {
        //passo os requisitos que quero na busca
        params: {
          //passo o nome do filme que foi passado no input pelo home
          query: route.params?.name,
          api_key: key,
          language: 'pt-BR',
          page: 1,
        }
      })
      //se ainda estiver buscando na api
      if(isActive){
        //seto o valor de movie com o resultado encontrado na api
        setMovie(response.data.results)
        //digo que pra parar de carregar
        setLoading(false)
      }
    }

    if(isActive){
      getSearchMovie()
    }

    return () => {
      isActive = false
    }
  }, [])

  function navigateDetailsPage(item){
    navigation.navigate('Detail', {id: item.id})
  }

  if(loading){
    return(
      <Container>

      </Container>
    )
  }
  return(
    <Container>
      <ListMovies
        data={movie}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <SearchItem data={item} navigatePage={(item) => navigateDetailsPage(item)}/>}
      />
    </Container>
  )
}
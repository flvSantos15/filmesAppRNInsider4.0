import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native'

import {
  Container, 
  SearchContainer, 
  Input, 
  SearchButton, 
  Title,
  BannerButton,
  Banner,
  SliderMovie,
} from './styles'

import { Feather } from '@expo/vector-icons'

import Header from '../../components/Header'
import SliderItem from '../../components/SliderItem';

import api, { key } from '../../services/api'
import { getListMovies, randomBanner } from '../../utils/movie'

import { useNavigation } from '@react-navigation/native'

export default function Home(){
  const [nowMovies, setNowMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topMovies, setTopMovies] = useState([])
  const [bannerMovie, setBannerMovie] = useState({})
  const [input, setInput] = useState('')

  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()

  useEffect(() => {
    let isActive = true
    const ac = new AbortController()

    async function getMovies(){
      const [nowData, popularData, topData] = await Promise.all([
        api.get('/movie/now_playing', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          }
        }),
        api.get('/movie/popular', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          }
        }),
        api.get('/movie/top_rated', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          }
        })
      ])
      //código para performance
      //só vou buscar na api quando o useEffect for executado
      //quando eu estiver nessa tela(isActive) vou precisar dessa busca

      if(isActive){
        const nowList = getListMovies(10, nowData.data.results)
        const popularList = getListMovies(5, popularData.data.results)
        const topList = getListMovies(5, topData.data.results)

        //altero o valor de bannerMovie com base na lista de filmes(movies)
        setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)])
        setNowMovies(nowList)
        setPopularMovies(popularList)
        setTopMovies(topList)

        setLoading(false)
      }
    }

    getMovies()
    //quando eu chamar outra tela não vou precisar que da lista dos em cartaz etc
    //quando estiver em outra tela, não vai estar ativo(isActive = false)
    return () => {
      isActive = false
      ac.abort()
    }
  }, [])

  //function para veirificar o id do filme que esta sendo clicado
  function navigateDetailsPage(item){
    //Dentro dele navego para outro componente
    navigation.navigate('Detail', {id: item.id})
  }

  function handleSearchMovie(){
    //se input estiver vazio não faça nada
    if(input === '') return
    navigation.navigate('Search', { name: input })
    //zerar o campo do Input
    setInput('')
  }

  // Crio um loading para indicar ao cliente que algo está acontecendo
  if(loading){
    return(
      <Container>
        <ActivityIndicator
          size='large'
          color='#fff'
        />
      </Container>
    )
  }
  return(
    <Container>
      {/*Qndo o header for chamado dessa página o titulo que vai receber é ReactPrime*/}
      <Header title='React Prime'/>
      <SearchContainer>
        <Input
          placeholder='Ex Vingadores'
          placeholderTextColor='#ddd'
          value={input}
          onChangeText={(text) => setInput(text)}
        />
          <SearchButton onPress={handleSearchMovie}>
            <Feather
              name='search'
              size={30}
              color='#fff'
            />
          </SearchButton>
      </SearchContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>
        <BannerButton 
          activeOpacity={0.9} 
          onPress={() => navigateDetailsPage(bannerMovie)}
        >
          <Banner
            resizeMethod='resize'
            source={{uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}`}}
          />
        </BannerButton>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={ ({item}) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)}/>}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Populares</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({item}) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)}/>}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Mais Votados</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({item}) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)}/>}
          keyExtractor={(item) => String(item.id)}
        />
      </ScrollView>
    </Container>
  )
}
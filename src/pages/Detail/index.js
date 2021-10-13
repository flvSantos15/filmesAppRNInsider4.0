import React, { useState, useEffect } from 'react'
import {
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description,
} from './styles'

import { Feather, Ionicons } from '@expo/vector-icons'

import { useNavigation, useRoute } from '@react-navigation/native'
import api, { key } from '../../services/api'

import Stars from 'react-native-stars'
import Genres from '../../components/Genres'
import { ScrollView, Modal } from 'react-native'
import ModalLink from '../../components/ModalLink'

import { saveMovie, hasMovie, deleteMovie } from '../../utils/storage'

export default function Detail(){
  //estanciando os hooks
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({})
  const [openLink, setOpenLink] = useState(false)
  const [favoritedMovie, setFavoritedMovie] = useState(false)

  useEffect(() => {
    let isActive = true

    async function getMovie(){
      const response = await api.get(`/movie/${route.params?.id}`, {
        params: {
          api_key: key,
          language: 'pt-BR'
        }
      })
      .catch((err) => {
        console.log(err)
      })

      if(isActive){
        setMovie(response.data)
        const isFavorite = await hasMovie(response.data)
        setFavoritedMovie(isFavorite)
      }
    }
    if(isActive){
      getMovie()
    }
    return() => {
      isActive = false
    }
  }, [])

  async function handleFavoriteMovie(movie){
    favoritedMovie ? (
      await deleteMovie(movie.id),
      setFavoritedMovie(false)
    ) : (
      await saveMovie('@primereact', movie),
      setFavoritedMovie(true)
    )
  }

  return(
    <Container>
      <Header>
        <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Feather
            name='arrow-left'
            size={28}
            color='#fff'
          />
        </HeaderButton>
        <HeaderButton onPress={() => handleFavoriteMovie(movie)}>
          {favoritedMovie ? (
            <Ionicons
              name='bookmark'
              size={28}
              color='#fff'
            />
          ) : (
            <Ionicons
              name='bookmark-outline'
              size={28}
              color='#fff'
            />
          )}
        </HeaderButton>
      </Header>
      <Banner
        resizeMethod='resize'
        source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
      />

      <ButtonLink onPress={() => setOpenLink(true)}>
        <Feather name='link' size={24} color='#fff'/>
      </ButtonLink>

      <Title numberOfLines={2}>{movie.title}</Title>
      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={ <Ionicons name='md-star' size={24} color='#e7a74e' /> }
          emptyStar={ <Ionicons name='md-star-outline' size={24} color='#e7a74e' /> }
          halfStar={ <Ionicons name='md-starr-half' size={24} color='#e7a74e'/> }
          disable={true}
        />
        <Rate>{movie.vote_average}</Rate>
      </ContentArea>
      <ListGenres
        //caso não tenha generos o output sera null, por isso coloco o ponto de interrogação
        data={movie?.genres}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <Genres data={item}/>}
      />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Title>Description</Title>
        <Description>
          {movie.overview}
        </Description>
      </ScrollView>
      
      <Modal
        animationType='slide'
        transparent={true}
        visible={openLink}
      >
        <ModalLink
          link={movie?.homepage}
          title={movie.title}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>
      
    </Container>
  )
}
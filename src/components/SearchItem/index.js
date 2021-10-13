import React from 'react';
import { Ionicons } from '@expo/vector-icons'

import {
  Container,
  Banner, 
  Title,
  RateContainer,
  Rate,
} from './styles'



export default function SearchItem({data, navigatePage}){
  function detailMovie(){
    //se o filme ainda não foi lançado
    if(data.release_date === ''){
      alert('Filme ainda sem data')
      return;
    }

    navigatePage(data)
  }

  return(
    <Container activeOpacity={0.7} onPress={detailMovie}>
      { data?.poster_path ? (
        <Banner
          resizeMethod='resize'
          source={{ uri: `https://image.tmdb.org/t/p/w500/${data?.poster_path}`}}
        />
      ) : (
        <Banner
          resizeMethod='resize'
          source={ require('../../assets/semfoto.png')}
        />
      )}
      <Title numberOfLines={1}>{data?.title}</Title>
      <RateContainer>
        <Ionicons name='md-star' size={12} color='#e7a74e' />
        <Rate>{data?.vote_average}/10</Rate>
      </RateContainer>
    </Container>
  )
}
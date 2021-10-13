import React from 'react';

import {
  Container,
  Title,
  RateContainer,
  Rate,
  Details,
  DetailsButton,
  DeleteButton
} from './styles'
import { Ionicons, Feather } from '@expo/vector-icons'

export default function FavoriteItem({data, deleteMovie, navigatePage}){
  return(
    <Container>
      <Title size={22} numberOfLines={1}>{data.title}</Title>
      <RateContainer>
        <Ionicons name='md-star' size={12} color='#e7a74e' />
        <Rate>{data.vote_average}/10</Rate>
      </RateContainer>

      <Details>
        <DetailsButton onPress={() => navigatePage('data')}>
          <Title size={14}>Ver detalhes</Title>
        </DetailsButton>

        <DeleteButton onPress={() => deleteMovie(data.id)}>
          <Feather name='trash' size={24} color='#fff'/>
        </DeleteButton>
      </Details>
    </Container>
  )
}
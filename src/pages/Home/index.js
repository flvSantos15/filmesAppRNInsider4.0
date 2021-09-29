import React from 'react';

import {Container, SearchContainer, Input, SearchButton} from './styles'
import Header from '../../components/Header'
import { Feather } from '@expo/vector-icons'

export default function Home(){
  return(
    <Container>
      <Header title='React Prime'/>
      <SearchContainer>
        <Input
          placeholder='Ex Vingadores'
          placeholderTextColor='#ddd'
        />
          <SearchButton>
            <Feather
              name='search'
              size={30}
              color='#fff'
            />
          </SearchButton>
      </SearchContainer>
    </Container>
  )
}
import React, { useState, useEffect} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native'
import FavoriteItem from '../../components/FavoriteItem';

import Header from '../../components/Header';
import { getMoviesSave, deleteMovie } from '../../utils/storage'
import { 
  Container,
  ListMovies,
} from './styles';

export default function Movies(){
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [movies, setMovies] = useState()

  useEffect(() => {
    let isActive = true;

    async function getFavoriteMovies(){
      const result = await getMoviesSave('@primereact');
      if(isActive){
        setMovies(result);
      }
    }

    if(isActive){
      getFavoriteMovies();
    }

    return () => {
      isActive = false;
    }
  }, [isFocused])

  async function handleDelete(id){
    const result = await deleteMovie(id);
    setMovies(result);
  }

  function navigateDetailsPage(item){
    navigation.navigate('Detail', {id: item.id})
  }
  return (
    <Container>
      <Header title={'Minha lista'}/>
      <ListMovies
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <FavoriteItem
           data={item}
           deleteMovie={ handleDelete }
           navigatePage={() => navigateDetailsPage(item)}
          />
        )}
      />
    </Container>
  );
}

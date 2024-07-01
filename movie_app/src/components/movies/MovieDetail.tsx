import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { API_ACCESS_TOKEN } from '@env';
import { FontAwesome } from '@expo/vector-icons';
import MovieList from './MovieList';
import type { Movie } from '../../types/app'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params;
  const [movies, setMovies] = useState<any>({});
  const [isFavorite, setIsFavorite] = useState(false);

  const getMovieInfo = () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', Authorization: `Bearer ${API_ACCESS_TOKEN}` }
    };

    fetch(`https://api.themoviedb.org/3/movie/786892?language=en-US`, options)
      .then(response => response.json())
      .then(response => setMovies(response))
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };

  useEffect(() => {
      getMovieInfo();
  }, []);
  

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movies.backdrop_path}` }} style={styles.image} />
        <Text style={styles.title}>{movies.title}</Text>
        <View style={styles.favoriteContainer}>
          <FontAwesome name="star" size={16} color="yellow" />
          <Text style={styles.rating}>{movies.vote_average}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            {isFavorite ? (
              <FontAwesome name="heart" size={23} color="red" />
            ) : (
              <FontAwesome name="heart-o" size={23} color="white" />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.overview}>{movies.overview}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoItem}>Original Language:</Text>
            <Text>{movies.original_language}</Text>
            <Text style={styles.infoItem}>Popularity:</Text>
            <Text>{movies.popularity}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoItem}>Release Date:</Text>
            <Text>{new Date(movies.release_date).toDateString()}</Text>
            <Text style={styles.infoItem}>Vote Count:</Text>
            <Text>{movies.vote_count}</Text>
          </View>
        </View>
        <View style={styles.recommendationContainer}>
          <MovieList
            title="Recommendation"
            path={`movie/${id}/recommendations`}
            coverType="poster"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
  },
  overview: {
    fontSize: 16,
    marginVertical: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  infoColumn: {
    flex: 1,
  },
  infoItem: {
    fontWeight: 'bold',
  },
  recommendationContainer: {
    marginVertical: 10,
  },
});

export default MovieDetail;

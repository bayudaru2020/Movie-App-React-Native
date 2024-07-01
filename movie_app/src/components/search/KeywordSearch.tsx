import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Text, FlatList } from 'react-native'

const KeywordSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState<string>('')
  const [movies, setMovies] = useState<any[]>([])

  const fetchMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}`, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODllZGQ3MGM2YWFhMmI0MTVjNDg4NzY3Yjc3MGE0OCIsIm5iZiI6MTcxOTQ3NzMwNy40MjEyNTQsInN1YiI6IjY2N2QyMmY1MzQyZTlmYTI5MzExZjA0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MEm2t9y-sl3U5wlvR-AyLtnxAZhxw5Q5KwVkEwdieJQ'
        }
      })
      const data = await response.json()
      console.log(data)
      setMovies(data.results)
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  const handleSubmit = () => {
    console.log('Keyword:', keyword)
    fetchMovies()
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter keyword..."
        value={keyword}
        onChangeText={setKeyword}
        onSubmitEditing={handleSubmit}
      />
      <Button title="Search" onPress={handleSubmit} />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.overview}>{item.overview}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  input: {
    height: 40,
    borderColor: '#C0B4D5',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
  movieItem: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  overview: {
    marginTop: 4,
    color: '#666',
  },
})

export default KeywordSearch

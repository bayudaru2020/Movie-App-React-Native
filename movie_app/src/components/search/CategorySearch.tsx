import React from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

const CategorySearch = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Enter category..." />
      <Button title="Search" onPress={() => { /* Implement search functionality here */ }} />
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
})

export default CategorySearch

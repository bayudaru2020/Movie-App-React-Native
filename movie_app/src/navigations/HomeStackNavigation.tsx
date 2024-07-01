import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screens/Home' // Import your Home component
import MovieDetail from '../components/movies/MovieDetail'


const Stack = createNativeStackNavigator()

const HomeStackNavigation = () => {
  return (
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MovieDetail" component={MovieDetail} />
      </Stack.Navigator>
  )
}

export default HomeStackNavigation


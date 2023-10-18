import React from 'react';
import { Example, Home } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Example} />
      <Stack.Screen name="Feed" component={Home} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

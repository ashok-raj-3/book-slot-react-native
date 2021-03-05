/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet, Text, Image, View, FlatList,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SellersListPage from './view/pages/SellersListPage';
import SellerDetailsPage from './view/pages/SellerDetailsPage';

const Stack = createStackNavigator();

const headerStyle = {

  headerStyle: {
    backgroundColor: '#663399',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: "center"
  },
  headerTitleAlign: 'center'
}

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SellersList" component={SellersListPage}
          options={{ ...{ title: 'Sellers' }, ...headerStyle }} />
        <Stack.Screen name="SellerDetails" component={SellerDetailsPage}
          options={{ ...{ title: 'Appointment' }, ...headerStyle }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;

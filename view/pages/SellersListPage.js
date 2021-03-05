
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet, Text, Image, View, FlatList,
} from 'react-native';
import { Card, Title, Button, Paragraph } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { siteUrl } from '../api/environment';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};
const SellersListPage = ({ navigation }) => {


  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [loader, showLoader] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const url = siteUrl + 'getAllSellers?name=' + text;
    showLoader(true);

    try {
      const data = await axios.get(url);
      setUsers(data.data);
    } catch { }
    finally {
      showLoader(false);
    }
  }


  const renderItem = ({ item }) => {
    return (
      <View style={styles.sellerCard} >
        <Card>
          <Card.Content>
            <Title>{item.name}</Title>
            <Paragraph>Phone :{item.phone}</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: item.image }} />
          <Card.Actions>
            <Button onPress={() => navigation.navigate('SellerDetails', {
              item: item
            })}
            >View Seller</Button>
          </Card.Actions>
        </Card>


      </View>
    )
  };



  return (
    <View style={styles.main}>
      <Spinner
        visible={loader}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <TextInput
        style={styles.searchBox}
        label="Search Seller"
        mode="outlined"
        value={text}
        onChangeText={text => {
          setText(text);
          getUsers();
          console.log('text ', text);
        }}
      />




      <FlatList style={{ marginBottom: 70 }}
        keyExtractor={item => item.login}
        data={users}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  logo: {
    width: 200,
    height: 200
  },
  name: {
    fontSize: 20
  },
  main: {
    // alignItems: 'center'
    marginLeft: 20,
    marginRight: 20
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  searchBox: {
    marginTop: 10,
    marginBottom: 10,
  },
  sellerCard: {
    marginBottom: 20
  }
});

export default SellersListPage;

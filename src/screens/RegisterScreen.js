import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {leftArrow} from '../assets';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import host from '../utilities/host';

const {height, width} = Dimensions.get('screen');

const RegisterScreen = ({navigation}) => {
  const [value, setValue] = useState({
    nama: '',
    username: '',
    role: 'helper',
  });

  const registerUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios({
        method: 'POST',
        url: host + '/users/register',
        data: value,
        headers: {token},
      });
      console.log('sukses');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'column', flex: 1}}>
        <View>
          <View>
            <View
              style={{
                position: 'relative',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  left: 16,
                }}
                onPress={() => navigation.goBack()}
              >
                <Image source={leftArrow} />
              </TouchableOpacity>
              <View>
                <Text
                  style={{fontWeight: '700', fontSize: 20, color: '#3AB4F2'}}
                >
                  Register Helper
                </Text>
              </View>
            </View>
          </View>
          <ScrollView>
            <View style={{marginHorizontal: 16, marginTop: 20}}>
              <Text style={{color: 'black'}}>nama</Text>
              <TextInput
                placeholder="nama"
                autoCapitalize="none"
                style={styles.inputSize}
                onChangeText={text => setValue({...value, nama: text})}
                value={value.nama}
              />
            </View>
            <View style={{marginHorizontal: 16, marginTop: 10}}>
              <Text style={{color: 'black'}}>Username</Text>
              <TextInput
                placeholder="username"
                autoCapitalize="none"
                style={styles.inputSize}
                onChangeText={text => setValue({...value, username: text})}
                value={value.username}
              />
            </View>
          </ScrollView>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={{
              width: width - 32,
              marginLeft: 16,
              height: 50,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'green',
            }}
            onPress={() => registerUser()}
          >
            <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
              Daftar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  inputSize: {
    width: width - 32,
    marginTop: 5,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    color: 'blue',
  },
  inputSizeText: {
    width: width - 32,
    marginTop: 5,
    height: 200,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    color: 'blue',
  },
});

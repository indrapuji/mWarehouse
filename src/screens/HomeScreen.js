import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {findStuff, findUser, addUser, scan} from '../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

import {AuthContext} from '../components/Context';

const {width} = Dimensions.get('screen');

const Home = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [role, setRole] = useState();

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    try {
      console.log('masuk bos');
      const Role = await AsyncStorage.getItem('userRole');
      const Token = await AsyncStorage.getItem('userToken');
      const Nama = await AsyncStorage.getItem('userName');
      if (Role !== null) {
        setRole(Role);
        console.log(Role, Token, Nama);
      }
    } catch (e) {
      console.log('error');
    }
  };
  return (
    <SafeAreaView>
      <View style={{marginHorizontal: 16, marginTop: 20}}>
        <TouchableOpacity style={{marginBottom: 30}} onPress={() => signOut()}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 20,
              color: '#3AB4F2',
              fontStyle: 'italic',
            }}
          >
            Welcome Back,
          </Text>
          <Text style={{fontWeight: '700', fontSize: 30, color: '#3AB4F2'}}>
            {role}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {role === 'admin' ? (
            <>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  width: width - 32,
                  height: 120,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#3AB4F2',
                  marginTop: 20,
                  flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('Search')}
              >
                <Image source={findStuff} style={{width: 100, height: 100}} />
                <Text
                  style={{
                    color: '#3AB4F2',
                    fontSize: 30,
                    fontWeight: '700',
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                >
                  Cari Barang
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  width: width - 32,
                  height: 120,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#3AB4F2',
                  marginTop: 20,
                  flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('SearchUser')}
              >
                <Image source={findUser} style={{width: 100, height: 100}} />
                <Text
                  style={{
                    color: '#3AB4F2',
                    fontSize: 30,
                    fontWeight: '700',
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                >
                  Cari User
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  width: width - 32,
                  height: 120,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#3AB4F2',
                  marginTop: 20,
                  flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('Register')}
              >
                <Image source={addUser} style={{width: 100, height: 100}} />
                <Text
                  style={{
                    color: '#3AB4F2',
                    fontSize: 30,
                    fontWeight: '700',
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                >
                  Daftar User
                </Text>
              </TouchableOpacity>
            </>
          ) : role === 'helper' ? (
            <>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  width: width - 32,
                  height: 120,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#3AB4F2',
                  marginTop: 20,
                  flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('Write')}
              >
                <Image source={findStuff} style={{width: 100, height: 100}} />
                <Text
                  style={{
                    color: '#3AB4F2',
                    fontSize: 30,
                    fontWeight: '700',
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                >
                  Cari Barang
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  width: width - 32,
                  height: 120,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#3AB4F2',
                  marginTop: 20,
                  flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('Scan')}
              >
                <Image source={scan} style={{width: 100, height: 100}} />
                <Text
                  style={{
                    color: '#3AB4F2',
                    fontSize: 30,
                    fontWeight: '700',
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                >
                  Scan Barang
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  width: width - 32,
                  height: 120,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#3AB4F2',
                  marginTop: 20,
                  flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('Write')}
              >
                <Image source={findStuff} style={{width: 100, height: 100}} />
                <Text
                  style={{
                    color: '#3AB4F2',
                    fontSize: 30,
                    fontWeight: '700',
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                >
                  Cari Barang
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});

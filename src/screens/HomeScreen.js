import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {findStuff, findUser, addUser, scan} from '../assets';

const {width} = Dimensions.get('screen');

const Home = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={{marginHorizontal: 16, marginTop: 20}}>
        <TouchableOpacity style={{marginBottom: 30}}>
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
            Directur
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* <TouchableOpacity
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
            onPress={() => navigation.navigate('Inbox')}
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
            onPress={() => navigation.navigate('Disposisi')}
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
          </TouchableOpacity> */}

          {/* <TouchableOpacity
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
            onPress={() => navigation.navigate('Write')}
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
          </TouchableOpacity> */}

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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});

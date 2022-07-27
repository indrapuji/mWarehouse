import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {leftArrow} from '../assets';
import axios from 'axios';
import host from '../utilities/host';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('screen');

const SearchScreen = ({navigation}) => {
  const [searchItem, setSearchItem] = useState();
  const [dataBarang, setDataBarang] = useState();
  const [showData, setShowData] = useState(false);

  const handleSearch = async () => {
    try {
      setDataBarang('');
      const token = await AsyncStorage.getItem('userToken');
      const {data} = await axios({
        method: 'GET',
        url: `${host}/barang/list?search=${searchItem}`,
        headers: {token},
      });
      setDataBarang(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={{marginLeft: 16}}>
        <View
          style={{
            position: 'relative',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 16,
            marginBottom: 16,
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
            <Text style={{fontWeight: '700', fontSize: 20, color: '#3AB4F2'}}>
              Cari Barang
            </Text>
          </View>
        </View>

        <TextInput
          placeholder="Nama Barang"
          autoCapitalize="none"
          style={styles.inputSize}
          onChangeText={text => setSearchItem({searchItem: text})}
          value={searchItem}
        />
        <TouchableOpacity
          style={styles.bottonSize}
          onPress={() => handleSearch()}
        >
          <Text style={styles.textButton}>Cari</Text>
        </TouchableOpacity>
        {dataBarang && (
          <View>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <View style={{flex: 1}}>
                <Text style={{fontWeight: 'bold'}}>Nama Barang</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{fontWeight: 'bold'}}>Jumlah Barang</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{color: 'black'}}>{dataBarang.nama}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{color: 'black'}}>{dataBarang.total}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  inputSize: {
    width: width - 36,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 50,
    color: 'blue',
  },
  bottonSize: {
    width: width - 36,
    height: 50,
    borderRadius: 10,
    marginBottom: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
});

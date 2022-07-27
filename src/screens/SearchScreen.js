import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {leftArrow} from '../assets';
import axios from 'axios';
import host from '../utilities/host';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('screen');

const SearchScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchItem, setSearchItem] = useState();
  const [dataBarang, setDataBarang] = useState();
  const [showData, setShowData] = useState(false);

  const handleSearch = async () => {
    try {
      setDataBarang('');
      const token = await AsyncStorage.getItem('userToken');
      const {data} = await axios({
        method: 'GET',
        url: `${host}/barang/list?search=${searchItem.searchItem}`,
        headers: {token},
      });
      setDataBarang(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMasuk = async idBarang => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios({
        method: 'PUT',
        url: `${host}/barang/masuk/${idBarang}`,
        headers: {token},
      });
      handleSearch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeluar = async idBarang => {
    console.log(idBarang);
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios({
        method: 'PUT',
        url: `${host}/barang/keluar/${idBarang}`,
        headers: {token},
      });
      handleSearch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={{marginLeft: 16}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Berhasil</Text>
              <View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handleCloseModal()}
                >
                  <Text style={styles.textStyle}>Done</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
              <View style={{flex: 1}}>
                <Text style={{fontWeight: 'bold'}}>Action</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{color: 'black'}}>{dataBarang.nama}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{color: 'black'}}>{dataBarang.total}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}
              >
                <TouchableOpacity
                  style={{backgroundColor: 'green', borderRadius: 5}}
                  onPress={() => handleMasuk(dataBarang.id)}
                >
                  <Text style={{padding: 5}}>Masuk</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{backgroundColor: 'yellow', borderRadius: 5}}
                  onPress={() => handleKeluar(dataBarang.id)}
                >
                  <Text style={{padding: 5}}>Keluar</Text>
                </TouchableOpacity>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: width - 50,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

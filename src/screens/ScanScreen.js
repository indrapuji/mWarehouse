import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import {leftArrow} from '../assets';
import axios from 'axios';
import host from '../utilities/host';
import AsyncStorage from '@react-native-async-storage/async-storage';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const {width} = Dimensions.get('screen');
const ScanScreen = ({navigation}) => {
  const [dataBarang, setDataBarang] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleConfimationMasuk, setModalVisibleConfimationMasuk] = useState(false);
  const [modalVisibleConfimationKeluar, setModalVisibleConfimationKeluar] = useState(false);
  const [tambah, setTambah] = useState(0);
  const [modalVisibleError, setModalVisibleError] = useState(false);

  const onSuccess = async (e) => {
    try {
      if (isNaN(e.data)) {
        setModalVisibleError(true);
      } else {
        const token = await AsyncStorage.getItem('userToken');
        const { data } = await axios({
          method: 'GET',
          url: `${host}/barang/single/${e.data}`,
          headers: { token },
        });
        console.log(data);
        setDataBarang(data);
        setModalVisible(true)
        setTambah(data.id);
      }
    } catch (error) {
      if (error?.response?.status >= 400) {
        setModalVisibleError(true);
      }
      console.log(error);
    }
  };

  const handleMasuk = async () => {
    try {
      console.log('handle masukkkk', tambah);
      startScan();
      await setModalVisible(false)
      setModalVisibleConfimationMasuk(false);
      setModalVisibleConfimationKeluar(false);
      const token = await AsyncStorage.getItem('userToken');
      await axios({
        method: 'PUT',
        url: `${host}/barang/masuk/${tambah}`,
        headers: { token },
      });
      
    } catch (error) {
      console.log(error)
    }
  }



  const handleKeluar = async () => {
    try {
      console.log('handle keluar', tambah);
      startScan();
      await setModalVisible(false)
      setModalVisibleConfimationMasuk(false);
      setModalVisibleConfimationKeluar(false);
      const token = await AsyncStorage.getItem('userToken');
      console.log(token);
      await axios({
        method: 'PUT',
        url: `${host}/barang/keluar/${tambah}`,
        headers: { token },
      });
      
    } catch (error) {
      console.log(error)
    }
  };

  const handleModalConfirmation = (tipe) => {
    setModalVisible(false);
    if (tipe === 'masuk') {
      console.log('masukkkkkk')
      setModalVisibleConfimationMasuk(true);
    } else {
      setModalVisibleConfimationKeluar(true);
    }
  }

  const handleCloseModal = () => {
    startScan();
    setModalVisible(false)
    setModalVisibleConfimationMasuk(false);
    setModalVisibleConfimationKeluar(false);
    setModalVisibleError(false);
  }

  let scanner;

  const startScan = () => {
    if (scanner) {
      console.log('start scan');
      scanner.reactivate();
    }
  };
  
  return (
    <SafeAreaView>
      <View style={{marginLeft: 16, marginRight: 16}}>
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleError}
            onRequestClose={() => {
              handleCloseModal();
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Barang Tidak Ditemukan</Text>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => handleCloseModal()}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleConfimationKeluar}
            onRequestClose={() => {
              setModalVisibleConfimationKeluar(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Apakah Anda Yakin Ingin Mengeluarkan Barang?</Text>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={[styles.button, styles.confimButton]}
                    onPress={() => handleKeluar()}
                  >
                    <Text style={styles.textStyle}>Ya</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, { backgroundColor: 'orange', }]}
                    onPress={() => handleCloseModal()}
                  >
                    <Text style={styles.textStyle}>Tidak</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleConfimationMasuk}
            onRequestClose={() => {
              setModalVisibleConfimationMasuk(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Apakah Anda Yakin Ingin Memasukan Barang?</Text>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={[styles.button, styles.confimButton]}
                    onPress={() => handleMasuk()}
                  >
                    <Text style={styles.textStyle}>Ya</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, { backgroundColor: 'orange', }]}
                    onPress={() => handleCloseModal()}
                  >
                    <Text style={styles.textStyle}>Tidak</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

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
                <Text style={styles.modalText}>Nama Barang: </Text>
                <View style={styles.modalText}>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{
                      uri: `${dataBarang?.image_path}`,
                    }}
                  />
                </View>
                <Text style={styles.modalText}>{dataBarang?.nama} </Text>
                <Text style={styles.modalText}>Jumlah Masuk: </Text>
                <Text style={styles.modalText}>{dataBarang?.jumlah_masuk} </Text>
                <Text style={styles.modalText}>Jumlah Keluar:  </Text>
                <Text style={styles.modalText}>{dataBarang?.jumlah_keluar} </Text>
                <Text style={styles.modalText}>Total:  </Text>
                <Text style={styles.modalText}>{dataBarang?.total} </Text>
                <Text style={styles.modalText}>Action Barang:</Text>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={[styles.button, styles.confimButton]}
                    onPress={() => handleModalConfirmation('masuk')}
                  >
                    <Text style={styles.textStyle}>Masuk</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, { backgroundColor: 'orange', }]}
                    onPress={() => handleModalConfirmation('keluar')}
                  >
                    <Text style={styles.textStyle}>Keluar</Text>
                  </Pressable>
                </View>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => handleCloseModal()}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
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
              Scan Barang
            </Text>
          </View>
        </View>

        <View
          style={{position: 'relative', marginTop: 30, marginHorizontal: 9}}
        >
          <View
            style={{width: width - 50, height: 300}}
          >
            <QRCodeScanner
              ref={(camera) => scanner = camera}
              onRead={onSuccess}
              flashMode={RNCamera.Constants.FlashMode.auto}
              cameraContainerStyle={{width: width - 50, height: 100}}
              cameraStyle={{width: width - 50, height: 300}}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 200,
            marginLeft: 9,
            width: width - 50,
            height: 50,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'green',
          }}
        >
          <TouchableOpacity
            onPress={() => startScan()}
          >
            <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
              Scan Barcode
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScanScreen;

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
    width: 100
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  confimButton: {
    backgroundColor: 'green',
  },
  buttonClose: {
    backgroundColor: 'red',
    width: 223
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black'
  },
});

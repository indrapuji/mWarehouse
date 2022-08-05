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
  import React, { useEffect, useState } from 'react';
  import { leftArrow } from '../assets';
  import axios from 'axios';
  import host from '../utilities/host';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { formatNumber } from '../utilities/formatNumber';
  
  const { width } = Dimensions.get('screen');
  
  const KonfirmasiScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleConfimationMasuk, setModalVisibleConfimationMasuk] = useState(false);
    const [modalVisibleConfimationKeluar, setModalVisibleConfimationKeluar] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const [dataBarang, setDataBarang] = useState([]);
    const [showData, setShowData] = useState(false);
    const [barangModal, setBarangModal] = useState({});
    const [role, setRole] = useState('admin');
  
    const [tambah, setTambah] = useState(0);
  
    const setRoleStorage = async () => {
      const Role = await AsyncStorage.getItem('userRole');
      setRole(Role);
    }
    useEffect(() => {
      handleApi();
      setRoleStorage();
    }, []);
  
    const handleApi = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const { data } = await axios({
          method: 'GET',
          url: `${host}/barang/direktur/list`,
          headers: { token },
        });
        setDataBarang(data);
      } catch (error) {
        console.log(error);
      }
    }
  
    const handleSearch = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const { data } = await axios({
          method: 'GET',
          url: `${host}/barang/direktur/list?search=${searchItem.searchItem}`,
          headers: { token },
        });
        setDataBarang(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleModal = barang => {
      setBarangModal(barang);
      setModalVisible(true)
      setTambah(barang.dataBarang.id);
  
    };
  
    const handleApproval = async (data) => {
      try {
        console.log('handle approvallll', tambah);
        console.log(data);
        console.log(tambah);
        await setModalVisible(false)
        setModalVisibleConfimationMasuk(false);
        setModalVisibleConfimationKeluar(false);
        const token = await AsyncStorage.getItem('userToken');
        await axios({
          method: 'PUT',
          url: `${host}/barang/direktur/confirm`,
          headers: { token },
          data: {
            isConfirm: data.isConfirm,
            type: data.type,
            barang_id: tambah,
          }
        });
        searchItem.searchItem ? handleSearch() : handleApi();
        
      } catch (error) {
        console.log(error)
      }
    }
  
  
  
    const handleKeluar = async () => {
      try {
        console.log('handle keluar', tambah);
        await setModalVisible(false)
        setModalVisibleConfimationMasuk(false);
        setModalVisibleConfimationKeluar(false);
        const token = await AsyncStorage.getItem('userToken');
        await axios({
          method: 'PUT',
          url: `${host}/barang/keluar/${tambah}`,
          headers: { token },
        });
        searchItem.searchItem ? handleSearch() : handleApi();
        
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
      setModalVisible(false)
      setModalVisibleConfimationMasuk(false);
        setModalVisibleConfimationKeluar(false);
    }
  
    const handleTable = () => {
      return dataBarang.map((barang, idx) => {
        return (
          <View style={{ marginBottom: 10 }} key={idx}>
            <View style={{ flexDirection: 'row' }} key={idx}>
              <View style={{ flex: 1 }}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri: `${barang.dataBarang.image_path}`,
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: 'black' }}>{barang.dataBarang.nama}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={{ color: 'black' }}>{formatNumber(barang.dataBarang.total)}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                }}
              >
                <TouchableOpacity
                  style={{ backgroundColor: 'blue', borderRadius: 5, margin: 5, width: 50 }}
                  onPress={() => handleModal(barang)}
                >
                  <Text style={{ padding: 5, color: 'white', fontWeight: 'bold' }}>Detail</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
        )
      })
    }
  
    return (
      <SafeAreaView>
        <View style={{ marginLeft: 16 }}>
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
                <Text style={styles.modalText}>Approved atau Reject Barang Keluar?</Text>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={[styles.button, styles.confimButton]}
                    onPress={() => handleApproval({ isConfirm: true, type: 'keluar' })}
                  >
                    <Text style={styles.textStyle}>Approved</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, { backgroundColor: 'orange', }]}
                    onPress={() => handleApproval({ isConfirm: false, type: 'keluar' })}
                  >
                    <Text style={styles.textStyle}>Reject</Text>
                  </Pressable>
                </View>
                <Pressable
                    style={[styles.button, { backgroundColor: 'red', marginTop: 10, width: 225 }]}
                    onPress={() => handleCloseModal()}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
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
                <Text style={styles.modalText}>Approved atau Reject Barang Masuk?</Text>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={[styles.button, styles.confimButton]}
                    onPress={() => handleApproval({ isConfirm: true, type: 'masuk' })}
                  >
                    <Text style={styles.textStyle}>Approved</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, { backgroundColor: 'orange', }]}
                    onPress={() => handleApproval({ isConfirm: false, type: 'masuk' })}
                  >
                    <Text style={styles.textStyle}>Reject</Text>
                  </Pressable>
                </View>
                <Pressable
                    style={[styles.button, { backgroundColor: 'red', marginTop: 10, width: 225 }]}
                    onPress={() => handleCloseModal()}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
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
                      uri: `${barangModal.dataBarang?.image_path}`,
                    }}
                  />
                </View>
                <Text style={styles.modalText}>{barangModal.dataBarang?.nama} </Text>
                <Text style={styles.modalText}>Jumlah Masuk: </Text>
                <Text style={styles.modalText}>{formatNumber(barangModal.dataBarang?.jumlah_masuk)} </Text>
                <Text style={styles.modalText}>Jumlah Keluar:  </Text>
                <Text style={styles.modalText}>{formatNumber(barangModal.dataBarang?.jumlah_keluar)} </Text>
                <Text style={styles.modalText}>Total:  </Text>
                <Text style={styles.modalText}>{formatNumber(barangModal.dataBarang?.total)} </Text>
                <Text style={{...styles.modalText, fontWeight: 'bold'}}>Action Konfirmasi Barang:  </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Text style={{...styles.modalText, marginRight: 25}}>Jumlah Masuk</Text>
                    <Text style={styles.modalText}>Jumlah Keluar</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Pressable
                    style={[styles.button, styles.confimButton]}
                    onPress={() => handleModalConfirmation('masuk')}
                    >
                    <Text style={styles.textStyle}>{barangModal?.dataConfirmMasuk?.length}</Text>
                    </Pressable>
                    <Pressable
                    style={[styles.button, { backgroundColor: 'orange', }]}
                    onPress={() => handleModalConfirmation('keluar')}
                    >
                    <Text style={styles.textStyle}>{barangModal?.dataConfirmKeluar?.length}</Text>
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
              <Text style={{ fontWeight: '700', fontSize: 20, color: '#3AB4F2' }}>
                Konfirmasi Barang
              </Text>
            </View>
          </View>
  
          <TextInput
            placeholder="Nama Barang"
            autoCapitalize="none"
            style={styles.inputSize}
            onChangeText={text => setSearchItem({ searchItem: text })}
            value={searchItem}
          />
          <TouchableOpacity
            style={styles.bottonSize}
            onPress={() => handleSearch()}
          >
            <Text style={styles.textButton}>Cari</Text>
          </TouchableOpacity>
          <View>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>Foto</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>Nama</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>Total</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>Action</Text>
              </View>
            </View>
            {dataBarang.length > 0 ? handleTable() : <></>}
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default KonfirmasiScreen;
  
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
  
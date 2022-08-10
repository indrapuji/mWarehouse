import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {findStuff, findUser, addUser, scan, logout} from '../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

import {AuthContext} from '../components/Context';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const {width} = Dimensions.get('screen');
const month = moment().get('month') + 1;
const year = moment().get('year');

const Home = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [role, setRole] = useState();
  const [nama, setNama] = useState();
  const [loadingCetak, setLoadingCetak] = useState(false);

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
        setNama(Nama);
        console.log(Role, Token, Nama);
      }
    } catch (e) {
      console.log('error');
    }
  };

  const handleTablePdf = (data) => {
    return data.map((barang, idx) => {
      return (`
        <tr>
          <td>${idx+1}</td>
          <td>${barang.barang.nama}</td>
          <td>${barang.jumlah}</td>
          <td>${barang.user.nama}</td>
          <td>${barang.type === 'masuk' ? 'Masuk' : 'Keluar'}</td>
          <td>${moment(barang.createdAt).format('LLL')}</td>
          <td>${barang.status === 'approved' ? 'Disetujui' : barang.status === 'rejected' ? 'Ditolak' : 'Menunggu Persetujuan'}</td>
        </tr>
      `);
    }).join('\n');
  }

  const cetakPDF = async () => {
    try {
      setLoadingCetak(true);
      const token = await AsyncStorage.getItem('userToken');
      const {data} = await axios({
        method: 'GET',
        url: `${host}/barang/laporan/list`,
        headers: { token },
      });
      const tableRow = await handleTablePdf(data);
      let options = {
        html: `<!DOCTYPE html>
        <html>
          <head>
            <style>
              table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
              }
              
              td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
              }
              
              tr:nth-child(even) {
                background-color: #dddddd;
              }
            </style>
          </head>
          <body>
          
            <h2>Laporan Keluar Masuk Barang, Bulan ${moment(new Date()).set('month',month).format('MMMM')} Tahun ${year}</h2>
            <h2>Total Jumlah Barang: ${data.reduce((a, b) => a + (b['jumlah'] || 0), 0)}</h2>
            
            <table>
              <tr>
                <th>No</th>
                <th>Nama Barang</th>
                <th>Jumlah Barang</th>
                <th>Nama User</th>
                <th>Tipe</th>
                <th>Tanggal</th>
                <th>Status</th>
              </tr>
              ${tableRow}
            </table>
          
          </body>
        </html>
        
        `,
        fileName: moment.now().toString(),
        directory: 'Documents',
      };
  
      let file = await RNHTMLtoPDF.convert(options);
      const shareResponse = await Share.open({
        title: "Laporan Keluar Masuk Barang",
        message: "Cetak Laporan:",
        url: `file://${file.filePath}`,
        subject: "Report",
      });
    } catch (err) {
      // show modal error
      console.log(err);
    } finally {
      setLoadingCetak(false);
    }
  }
  return (
    <SafeAreaView>
      <View style={{marginHorizontal: 16, marginTop: 20}}>
        <ScrollView>
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
              {nama}
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
                    Menu Barang
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
                      fontSize: 22,
                      fontWeight: '700',
                      marginTop: 10,
                      marginLeft: 20,
                    }}
                  >
                    Menu Kelola Helper
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
                    Register User
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
                    Menu Barang
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
                  onPress={() => navigation.navigate('ChangePassword')}
                >
                  <Image source={scan} style={{width: 100, height: 100}} />
                  <Text
                    style={{
                      color: '#3AB4F2',
                      fontSize: 24,
                      fontWeight: '700',
                      marginTop: 10,
                      marginLeft: 20,
                    }}
                  >
                    Change Password
                  </Text>
                </TouchableOpacity>
                {
                  !loadingCetak ?
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
                      onPress={() => cetakPDF()}
                      // onPress={() => navigation.navigate('CetakLaporan')}
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
                        Cetak Laporan
                      </Text>
                    </TouchableOpacity>
                  :
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
                      Loading ...
                    </Text>
                  </TouchableOpacity>
                }
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
                    Menu Barang
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
                  onPress={() => navigation.navigate('Konfirmasi')}
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
                    Konfirmasi
                  </Text>
                </TouchableOpacity>
                {
                  !loadingCetak ?
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
                      // onPress={() => cetakPDF()}
                      onPress={() => navigation.navigate('CetakLaporan')}
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
                        Cetak Laporan
                      </Text>
                    </TouchableOpacity>
                  :
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
                      Loading ...
                    </Text>
                  </TouchableOpacity>
                }
              </>
            )}
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
              onPress={() => signOut()}
            >
              <Image source={logout} style={{width: 100, height: 100}} />
              <Text
                style={{
                  color: '#3AB4F2',
                  fontSize: 30,
                  fontWeight: '700',
                  marginTop: 10,
                  marginLeft: 20,
                }}
              >
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});

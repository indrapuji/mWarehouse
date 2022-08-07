import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import moment from 'moment';
import { leftArrow } from '../assets';
import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';

const { width } = Dimensions.get('screen');


const CetakLaporanScreen = ({navigation}) => {
  const [date, setDate] = useState(moment(new Date()));
  const [year, setYear] = useState(moment().get('year'));
  const [month, setMonth] = useState(moment().get('month') + 1);
  const [loadingCetak, setLoadingCetak] = useState(false);
  const [dataBarang, setDataBarang] = useState([]);
  const [dataDropdown, setDataDropdown] = useState([]);
  const [barangId, setBarangId] = useState(0);

  useEffect(() => {
    handleBarangApi();
  }, []);

  const handleBarangApi = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const { data } = await axios({
        method: 'GET',
        url: `${host}/barang/list`,
        headers: { token },
      });
      setDataBarang(data);
      setDataDropdown(data.map(data => data.nama));
    } catch (error) {
      console.log(error);
    }
  }

  const handleDateChange = (selectedDate) => {
    const split = selectedDate.split(' ');
    setMonth(split[1]);
    setYear(split[0]);
    const newDate = moment().set('month', split[1] -1).set('year', split[0]);
    setDate(newDate);
  }

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

  const handleCetakApi = async () => {
    try {
      console.log(year, month);
      setLoadingCetak(true);
      const token = await AsyncStorage.getItem('userToken');
      const {data} = await axios({
        method: 'GET',
        url: `${host}/barang/laporan/list?tahun=${year}&bulan=${month}&barangId=${barangId ? barangId : ''}`,
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
          
            <h2>Laporan Keluar Masuk Barang, Bulan ${month} Tahun ${year}</h2>
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

  const handleSelectDropdownBarang = (index) => {
    setBarangId(dataBarang[index].id);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ marginLeft: 16 }}>
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
                Menu Cetak Laporan
              </Text>
            </View>
          </View>

          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 20, color: 'black' }}>Pilih Bulan dan Tahun Laporan</Text>
          <Text style={{ textAlign: 'center', fontSize: 30, color: 'black', marginBottom: 30 }}>{date.format('MM-YYYY').toString()}</Text>
          <DatePicker
            mode="monthYear"
            selectorStartingYear={2000}
            onMonthYearChange={selectedDate => handleDateChange(selectedDate)}
          />
          <SelectDropdown
            data={dataDropdown}
            onSelect={(selectedItem, index) => {
              handleSelectDropdownBarang(index);
            }}
            buttonStyle={{
              width: width - 36,
              height: 50,
              borderRadius: 10,
              backgroundColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20
            }}
            buttonTextStyle={{
              color: 'white'
            }}
            defaultValue={''}
            defaultButtonText={'Pilih Barang'}
          />
          {
            !loadingCetak ?
              <TouchableOpacity
                style={{
                  width: width - 36,
                  height: 50,
                  borderRadius: 10,
                  marginBottom: 30,
                  backgroundColor: 'green',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20
                }}
                onPress={() => handleCetakApi()}
              >
                <Text style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '700',
                }}>Cetak</Text>
              </TouchableOpacity> :
              <TouchableOpacity
              style={{
                width: width - 36,
                height: 50,
                borderRadius: 10,
                marginBottom: 30,
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20
              }}
            >
              <Text style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '700',
              }}>Loading ...</Text>
            </TouchableOpacity>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CetakLaporanScreen;
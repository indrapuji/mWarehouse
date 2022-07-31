import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {leftArrow} from '../assets';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const {width} = Dimensions.get('screen');
const ScanScreen = ({navigation}) => {
  const onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };
  return (
    <SafeAreaView>
      <View style={{marginLeft: 16, marginRight: 16}}>
        {/* <View
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
              Scan Barang
            </Text>
          </View>
        </View>

        <View
          style={{position: 'relative', marginTop: 30, marginHorizontal: 9}}
        >
          <View
            style={{width: width - 50, height: 300, backgroundColor: 'grey'}}
          />
          <View style={{position: 'absolute', left: 10, top: 10}}>
            <Text>|</Text>
          </View>
          <View style={{position: 'absolute', left: 10, top: 5}}>
            <Text>--</Text>
          </View>
          <View style={{position: 'absolute', right: 10, top: 10}}>
            <Text>|</Text>
          </View>
          <View style={{position: 'absolute', right: 10, top: 5}}>
            <Text>--</Text>
          </View>
          <View style={{position: 'absolute', left: 10, bottom: 10}}>
            <Text>|</Text>
          </View>
          <View style={{position: 'absolute', left: 10, bottom: 5}}>
            <Text>--</Text>
          </View>
          <View style={{position: 'absolute', right: 10, bottom: 10}}>
            <Text>|</Text>
          </View>
          <View style={{position: 'absolute', right: 10, bottom: 5}}>
            <Text>--</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            marginTop: 15,
            marginLeft: 9,
            width: width - 50,
            height: 50,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'green',
          }}
        >
          <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
            Scan Barcode
          </Text>
        </TouchableOpacity> */}

        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.torch}
          topContent={
            <Text style={styles.centerText}>
              Go to{' '}
              <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
              your computer and scan the QR code.
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

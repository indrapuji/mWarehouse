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

const {width} = Dimensions.get('screen');

const SearchScreen = ({navigation}) => {
  const [searchItem, setSearchItem] = useState();

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
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.textButton}>Cari</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={{
              height: 30,
              borderBottomWidth: 1,
              justifyContent: 'center',
              width: width - 32,
              borderBottomColor: 'grey',
            }}
          >
            <Text style={{color: 'black'}}>Plug</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 30,
              borderBottomWidth: 1,
              justifyContent: 'center',
              width: width - 32,
              borderBottomColor: 'grey',
            }}
          >
            <Text style={{color: 'black'}}>Prefrom</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 30,
              borderBottomWidth: 1,
              justifyContent: 'center',
              width: width - 32,
              borderBottomColor: 'grey',
            }}
          >
            <Text style={{color: 'black'}}>Pot Lulur</Text>
          </TouchableOpacity>
        </View>
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
    // marginTop: 30,
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

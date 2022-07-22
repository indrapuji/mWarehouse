import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';

const {height, width} = Dimensions.get('screen');

const Login = ({navigation}) => {
  const [value, setValue] = useState({
    username: '',
    password: '',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3AB4F2" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
      >
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flex: 1, marginTop: 100}}>
            <Text style={styles.title}>M-Warehouse</Text>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/employee.png')}
            />
          </View>

          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TextInput
              placeholder="Enter Your Username"
              autoCapitalize="none"
              style={styles.inputSize}
              onChangeText={text => setValue({...value, username: text})}
              value={value.username}
            />
            <TextInput
              placeholder="Enter Your Password"
              autoCapitalize="none"
              secureTextEntry
              style={styles.inputSize}
              onChangeText={text => setValue({...value, password: text})}
              value={value.password}
            />
            <TouchableOpacity
              style={styles.bottonSize}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3AB4F2',
  },
  title: {
    fontWeight: '700',
    fontSize: 25,
    color: 'red',
    marginBottom: 50,
  },
  tinyLogo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  inputSize: {
    width: width - 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 50,
    color: 'blue',
  },
  bottonSize: {
    width: width - 50,
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

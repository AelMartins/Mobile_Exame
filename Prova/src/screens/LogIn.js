import { useState } from 'react';
import { View, Alert, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // navigation.navigate('Books');
    try {
      const user = await AsyncStorage.getItem('user');

      if (!user) {
        Alert.alert('Usuário não encontrado!');
        return;
      };

      const userObj = JSON.parse(user);

      if (userObj.email === email && userObj.password === password) {
        Alert.alert('Usuário encontrado com sucesso!');
        navigation.navigate('Books');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        inputMode="email"
      />

      <TextInput
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.5}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp} activeOpacity={0.5}>
        <Text style={styles.buttonText}>CADASTRAR USUÁRIO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: '#3DB8E8',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    color: '#999999',
    borderColor: '#b8cdd6',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '90%',
  },
  placeholder: {
    color: '#9eb1bb',
  },
});

import { useState } from 'react';
import { View, Alert, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    try {
      if (!name || !phone || !email || !password || !confirmPassword) {
        Alert.alert('Erro!', 'Por favor, reencha todos os campos');
        return;
      };

      if (password === confirmPassword) {
        const user = {
          name: name,
          phone: phone,
          email: email,
          password: password,
          confirmPassword: confirmPassword
        };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.navigate('LogIn');
      } else {
        Alert.alert('Erro!', 'Senha incorreta');
      }
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        inputMode="name"
      />

      <TextInput
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        autoCapitalize="none"
        inputMode="phone"
      />

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

      <TextInput
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
        placeholder="Confirme sua senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp} activeOpacity={0.5}>
        <Text style={styles.buttonText}>SALVAR</Text>
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

import { useState } from 'react';
import { View, Alert, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddBook({ navigation }) {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setbookAuthor] = useState('');
  const [bookYear, setbookYear] = useState('');
  const [bookGenero, setbookGenero] = useState('');
  const [bookDescription, setbookDescription] = useState('');

  const handleAddBook = async () => {
    try {
      if (!bookTitle || !bookAuthor || !bookYear || !bookGenero || !bookDescription) {
        Alert.alert('Erro!', 'Por favor, preencha todos os campos');
        return;
      };

      const storedBooks = await AsyncStorage.getItem('books');
      const books = storedBooks ? JSON.parse(storedBooks) : [];

      const bookExists = books.some(book => book.title === bookTitle && book.author === bookAuthor);

      if (bookExists) {
        Alert.alert('Erro!', 'Já existe um livro com o mesmo título e autor');
        return;
      }

      const newBook = {
        title: bookTitle,
        author: bookAuthor,
        year: bookYear,
        genero: bookGenero,
        description: bookDescription,
      };

      books.push(newBook);
      await AsyncStorage.setItem('books', JSON.stringify(books));

      Alert.alert('Sucesso', 'Livro adicionado com sucesso');
      navigation.navigate('Books');

      setBookTitle('');
      setbookAuthor('');
      setbookYear('');
      setbookGenero('');
      setbookDescription('');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível adicionar o livro');
    };
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
        placeholder="Título"
        value={bookTitle}
        onChangeText={setBookTitle}
        autoCapitalize="none"
        inputMode="text"
      />

      <TextInput
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
        placeholder="Autor"
        value={bookAuthor}
        onChangeText={setbookAuthor}
        autoCapitalize="none"
        inputMode="text"
      />

      <TextInput
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
        placeholder="Ano de publicação"
        value={bookYear}
        onChangeText={setbookYear}
        autoCapitalize="none"
        inputMode="numeric"
      />

      <TextInput
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
        placeholder="Gênero"
        value={bookGenero}
        onChangeText={setbookGenero}
        autoCapitalize="none"
        inputMode="text"
      />

      <TextInput
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
        placeholder="Descrição"
        value={bookDescription}
        onChangeText={setbookDescription}
        autoCapitalize="none"
        inputMode="text"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddBook} activeOpacity={0.5}>
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

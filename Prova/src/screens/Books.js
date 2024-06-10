import { useState, useEffect } from 'react';
import { View, Alert, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Books({ navigation }) {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const storedBooks = await AsyncStorage.getItem('books');
        const books = storedBooks ? JSON.parse(storedBooks) : [];
        setBooks(books);
        setFilteredBooks(books);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os livros');
      }
    };

    loadBooks();
  }, []);

  const handleDeleteBook = async (bookToDelete) => {
    try {
      const updatedBooks = books.filter(book => book !== bookToDelete);
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
      await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
      Alert.alert('Sucesso', 'Livro deletado com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar o livro');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  };

  const renderBook = ({ item }) => (
    <View style={styles.bookItem}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text>{item.author}</Text>
      <Text>{item.year}</Text>
      <Text>{item.genero}</Text>
      <Text>{item.description}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteBook(item)} activeOpacity={0.5}>
        <Text style={styles.deleteButtonText}>DELETAR</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por título"
        value={searchQuery}
        onChangeText={handleSearch}
        placeholderTextColor="#9eb1bb"
      />

      <FlatList
        data={filteredBooks}
        renderItem={renderBook}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddBook')} activeOpacity={0.5}>
        <Text style={styles.buttonText}>ADICIONAR LIVRO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogIn')} activeOpacity={0.5}>
        <Text style={styles.buttonText}>SAIR</Text>
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
  list: {
    width: '100%',
    marginBottom: 20,
  },
  bookItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    width: '100%',
    marginBottom: 10,
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

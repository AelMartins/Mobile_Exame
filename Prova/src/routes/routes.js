import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import Books from '../screens/Books';
import AddBook from '../screens/AddBook';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen 
          name="LogIn"
          component={LogIn}
          options={{
            title: 'LogIn',
            headerTitleAlign: 'center',
            headerTintColor: styles.headerTint.color,
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'Cadastro',
            headerTitleAlign: 'center',
            headerTintColor: styles.headerTint.color,
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
          }}
        />
        <Stack.Screen
          name="Books"
          component={Books}
          options={{
            title: 'Books',
            headerTitleAlign: 'center',
            headerTintColor: styles.headerTint.color,
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
          }}
        />
        <Stack.Screen
          name="AddBook"
          component={AddBook}
          options={{
            title: 'AddBook',
            headerTitleAlign: 'center',
            headerTintColor: styles.headerTint.color,
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTint: {
    color: '#ffffff',
  },
  headerStyle: {
    backgroundColor: '#3DB8E8',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

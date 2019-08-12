import React, {Fragment, Text} from 'react';
import { YellowBox } from 'react-native';

//Ignorar alertas no celular
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);


//import Login from './pages/Login';

import Routes from './routes';

export default function App() {
  return (
    <Routes />
  );
};


/*

    <View style={styles.container}>
      <Text style={styles.text}>ola</Text>
    </View>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItens: 'center'
  },

  text: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 20
  }
});*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions } from 'react-native';

import Page from './src/Page/Page';
import Header from './src/Layout/Header/Header'
import Footer from './src/Layout/Footer/Footer'

export default function App() {
  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      height: height,
      flexDirection : 'column',
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Header width={width} height={height}/>
      <Page width={width} height={height}/>
      <Footer width={width} height={height}/>
      <StatusBar style="auto" />
    </View>
  );
}



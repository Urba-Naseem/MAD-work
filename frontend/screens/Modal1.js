import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import {View, Text, Button, Modal, StyleSheet} from "react-native";

export default function App(){
  const[modalVisible, setModalVisible] = useState(false);

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button
        title="Open Modal"
        onPress = {() => setModalVisible(true)}
      />
      <Modal visible={modalVisible}>
        <View style={styles.container}>
          <Text>This is a Modal Popup:)</Text>
          <Text>Practice of Modal And Formik implementation in React-native is assigned by Ma'am Kausar, and the deadline is Sunday(19th April,2026)</Text>
          <Button
            title = "Close Modal"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
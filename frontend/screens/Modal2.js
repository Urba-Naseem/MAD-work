import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import {View, Text, Button, Modal, StyleSheet} from "react-native";

export default function App(){
  const[modalVisible, setModalVisible] = useState(false);

  return(
    <View style={styles.container}>
      <View style={styles.button}>
       <Button
       title = "Open Modal"
       onPress={() => setModalVisible(true)}
       color="#e26517"
       />
      </View>
      <Modal visible={modalVisible} style={styles.modal}>
        <View style={styles.modalStyle}>
          <Text style={styles.heading}>This is a Modal Popup:)</Text>
          <Text style={styles.content}>Practice of Modal And Formik implementation in React-native is assigned by Ma'am Kausar, and the deadline is Sunday(19th April,2026)</Text>
          <View style={styles.button}>
           <Button 
            title="Close Modal"
            onPress={() => setModalVisible(false)}
            color="#e26517"
            />
          </View>  
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffff',
    },
    modal:  {
      animationType: 'slide',
    },
    modalStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#cdcdcd',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#e26517f1',
      textAlign: 'center',
    },
    content: {
      fontSize: 16,
      color: "#e26517f1",
      textAlign: "center",
      marginBottom: 30,
    },
    button: {
      width: '60%',
      marginTop: 10,
    },
});
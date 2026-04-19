import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import {View, Text, Button, Modal} from "react-native";
import styles from "./frontend/style/Modal3Style";

export default function App(){
  const[modalVisible, setModalVisible] = useState(false);

  return(
    <View style={styles.container}>
      <View style={styles.button}>
       <Button
       title = "Open Modal"
       onPress={() => setModalVisible(true)}
       color="#E26517"
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
            color= "#E26517"
            />
          </View>  
        </View>
      </Modal>
    </View>
  );
}
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../styles/GlobalStyles';

export default function ContactScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!message.trim()) {
      Alert.alert('Empty Message', 'Please enter your message.');
      return;
    }

    Alert.alert('Success', 'Message sent successfully!');
    setEmail('');
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.title}>Contact Us</Text>
          <Text style={GlobalStyles.subtitle}>
            Reach out to us using any of the options below.
          </Text>

          {/* Contact Options */}
          <View style={GlobalStyles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              <Ionicons name="call-outline" size={22} color="#FACC15" />
              <Text style={{ color: '#fff', marginLeft: 10 }}>+92 300 1234567</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              <Ionicons name="location-outline" size={22} color="#FACC15" />
              <Text style={{ color: '#fff', marginLeft: 10 }}>Rawalpindi, Pakistan</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              <Ionicons name="mail-outline" size={22} color="#FACC15" />
              <Text style={{ color: '#fff', marginLeft: 10 }}>contact@studentapp.com</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="logo-facebook" size={22} color="#FACC15" />
              <Text style={{ color: '#fff', marginLeft: 10 }}>facebook.com/studentapp</Text>
            </View>
          </View>

          {/* Email & Message Section */}
          <View style={GlobalStyles.card}>
            <Text style={{ color: '#FACC15', marginBottom: 8 }}>Send us a Message</Text>

            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#aaa"
              style={GlobalStyles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <TextInput
              placeholder="Enter your message"
              placeholderTextColor="#aaa"
              style={[GlobalStyles.input, { height: 100, textAlignVertical: 'top' }]}
              value={message}
              onChangeText={setMessage}
              multiline
            />

            <TouchableOpacity style={GlobalStyles.button} onPress={handleSubmit}>
              <Text style={GlobalStyles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={GlobalStyles.button} onPress={() => navigation.goBack()}>
            <Text style={GlobalStyles.buttonText}>⬅ Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
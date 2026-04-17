import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

export default function ProfileScreen({ navigation }) {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');

  return (
    <View style={GlobalStyles.container}>

      <Text style={GlobalStyles.title}>My Profile</Text>

      <View style={GlobalStyles.card}>

        {/* Online Profile Image */}
        <Image
          source={{
            uri: 'https://randomuser.me/api/portraits/men/32.jpg'
          }}
          style={{
            width: 130,
            height: 130,
            borderRadius: 65,
            alignSelf: 'center',
            marginBottom: 20,
            borderWidth: 3,
            borderColor: '#FACC15',
          }}
        />

        <TextInput
          placeholder="Enter Name"
          placeholderTextColor="#aaa"
          style={GlobalStyles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Enter Age"
          placeholderTextColor="#aaa"
          style={GlobalStyles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Enter Course"
          placeholderTextColor="#aaa"
          style={GlobalStyles.input}
          value={course}
          onChangeText={setCourse}
        />

      </View>

      {/* Live Preview */}
      <View style={GlobalStyles.card}>
        <Text style={{ color: '#FACC15', fontSize: 18, marginBottom: 5 }}>
          Live Preview
        </Text>

        <Text style={{ color: '#fff' }}>Name: {name || '---'}</Text>
        <Text style={{ color: '#fff' }}>Age: {age || '---'}</Text>
        <Text style={{ color: '#fff' }}>Course: {course || '---'}</Text>
      </View>

      <TouchableOpacity
        style={GlobalStyles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={GlobalStyles.buttonText}>⬅ Back to Home</Text>
      </TouchableOpacity>

    </View>
  );
}
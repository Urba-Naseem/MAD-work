// ./frontend/screens/EditProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { updateUserInStorage } from '../utils/storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen({ navigation }) {
  const { user, loadUser } = useUser();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    sapId: user?.sapId || '',
    semester: user?.semester || '',
    gpa: user?.gpa || '',
    cgpa: user?.cgpa || '',
    coursesText: user?.coursesText || '',
    profileImage: user?.profileImage || '',
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Need camera roll permission to update profile picture');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setFormData({ ...formData, profileImage: result.assets[0].uri });
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.sapId) {
      Alert.alert('Error', 'Name and SAP ID are required');
      return;
    }

    const gpa = parseFloat(formData.gpa);
    if (isNaN(gpa) || gpa < 0 || gpa > 4.0) {
     Alert.alert('Invalid GPA', 'GPA must be a number between 0 and 4.0');
     return;
    }

    const cgpa = parseFloat(formData.cgpa);
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 4.0) {
     Alert.alert('Invalid CGPA', 'CGPA must be a number between 0 and 4.0');
     return;
    }
    setLoading(true);
    try {
      const updatedUser = { ...user, ...formData };
      await updateUserInStorage(updatedUser);
      await loadUser();
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { label: 'Full Name', key: 'name', placeholder: 'Enter your name', icon: 'person-outline' },
    { label: 'SAP ID', key: 'sapId', placeholder: 'Enter SAP ID', icon: 'card-outline' },
    { label: 'Semester', key: 'semester', placeholder: 'e.g., Fall 2024', icon: 'calendar-outline' },
    { label: 'GPA', key: 'gpa', placeholder: 'Current GPA (0-4.0)', icon: 'star-outline' },
    { label: 'CGPA', key: 'cgpa', placeholder: 'Overall CGPA(0-4.0)', icon: 'trophy-outline' },
    { label: 'Courses', key: 'coursesText', placeholder: 'Comma separated courses', icon: 'book-outline' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 20 }}>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <TouchableOpacity onPress={pickImage} style={{ position: 'relative' }}>
          <Image source={{ uri: formData.profileImage || 'https://ui-avatars.com/api/?background=4A90E2&color=fff' }} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: colors.primary }} />
          <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.primary, borderRadius: 20, padding: 6 }}>
            <Ionicons name="camera" size={16} color="#FFF" />
          </View>
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.textSecondary, marginTop: 8 }}>Tap to change photo</Text>
      </View>

      {inputFields.map((field) => (
        <View key={field.key} style={{ marginBottom: 16 }}>
          <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.text, marginBottom: 8 }}>{field.label}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 12 }}>
            <Ionicons name={field.icon} size={20} color={colors.textSecondary} />
            <TextInput
              style={{ flex: 1, paddingVertical: 14, paddingHorizontal: 8, fontFamily: 'Inter_400Regular', fontSize: 16, color: colors.text }}
              placeholder={field.placeholder}
              placeholderTextColor={colors.textSecondary}
              value={formData[field.key]}
              onChangeText={(text) => setFormData({ ...formData, [field.key]: text })}
            />
          </View>
        </View>
      ))}


      <TouchableOpacity
        onPress={handleSave}
        disabled={loading}
        style={{ backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 24 }}
      >
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 16, color: '#FFF' }}>Save Changes</Text>}
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
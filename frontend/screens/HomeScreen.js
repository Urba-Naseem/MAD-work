// screens/HomeScreen.js (Smart Dashboard + Notepad)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  TextInput,          // ✅ added for note input
  Alert,              // ✅ for delete confirmation
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';  // ✅ added
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const { user, loadUser } = useUser();
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [quote, setQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // ✅ Notepad state
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Mock stats data
  const [stats, setStats] = useState({
    attendance: 85,
    upcomingClasses: 3,
    assignmentsDue: 2,
  });

  // ✅ Load notes for current user from AsyncStorage
  const loadNotes = async () => {
    if (!user?.email) return;
    try {
      const key = `notes_${user.email}`;
      const stored = await AsyncStorage.getItem(key);
      if (stored) setNotes(JSON.parse(stored));
      else setNotes([]);
    } catch (error) {
      console.error('Failed to load notes:', error);
    }
  };

  // ✅ Save notes to AsyncStorage
  const saveNotes = async (newNotes) => {
    if (!user?.email) return;
    try {
      const key = `notes_${user.email}`;
      await AsyncStorage.setItem(key, JSON.stringify(newNotes));
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  };

  // ✅ Add a new note
  const addNote = () => {
    if (newNote.trim().length === 0) {
      Alert.alert('Empty Note', 'Please enter some text');
      return;
    }
    const updated = [...notes, newNote.trim()];
    setNotes(updated);
    saveNotes(updated);
    setNewNote('');
  };

  // ✅ Delete a note by index
  const deleteNote = (index) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updated = notes.filter((_, i) => i !== index);
            setNotes(updated);
            saveNotes(updated);
          },
        },
      ]
    );
  };

  // Fetch API using DummyJSON
  const fetchQuote = async () => {
    setQuoteLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      console.error('Fetch error:', error);
      setQuote('Stay curious and keep learning!');
    } finally {
      setQuoteLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUser();
    await fetchQuote();
    await loadNotes();       
    setStats({
      attendance: Math.floor(75 + Math.random() * 20),
      upcomingClasses: Math.floor(1 + Math.random() * 5),
      assignmentsDue: Math.floor(0 + Math.random() * 4),
    });
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUser();
      fetchQuote();
      loadNotes();           
    });
    return unsubscribe;
  }, [navigation, user?.email]);

  if (!user) return null;

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Progress bar component
  const ProgressBar = ({ percentage, color }) => (
    <View style={{ height: 8, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden', marginTop: 8 }}>
      <View style={{ width: `${percentage}%`, height: '100%', backgroundColor: color, borderRadius: 4 }} />
    </View>
  );

  const cgpaPercentage = (parseFloat(user.cgpa) / 4.0) * 100;
  const gpaPercentage = (parseFloat(user.gpa) / 4.0) * 100;

  const infoCards = [
    { label: 'SAP ID', value: user.sapId, icon: 'id-card', color: '#4A90E2' },
    { label: 'Semester', value: user.semester, icon: 'calendar', color: '#FF6B6B' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
      >
        {/* Header with greeting and theme switch */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 12 }}>
          <View>
            <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary }}>
              {getGreeting()}
            </Text>
            <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 24, color: colors.text }}>
              {user.name.split(' ')[0]} 👋
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Switch value={isDarkMode} onValueChange={toggleTheme} trackColor={{ false: '#E5E7EB', true: '#4A90E2' }} />
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <Ionicons name="create-outline" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Section */}
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Image source={{ uri: user.profileImage }} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: colors.primary }} />
          <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 24, color: colors.text, marginTop: 12 }}>{user.name}</Text>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary }}>{user.email}</Text>
        </View>

        {/* GPA & CGPA Cards */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 24, gap: 12 }}>
          <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.textSecondary }}>Current GPA</Text>
            <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 28, color: colors.primary }}>{user.gpa}</Text>
            <ProgressBar percentage={gpaPercentage} color={colors.primary} />
            <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.textSecondary, marginTop: 4 }}>out of 4.0</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.textSecondary }}>CGPA</Text>
            <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 28, color: colors.accent }}>{user.cgpa}</Text>
            <ProgressBar percentage={cgpaPercentage} color={colors.accent} />
            <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.textSecondary, marginTop: 4 }}>out of 4.0</Text>
          </View>
        </View>

        {/* Quick Stats Cards */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 18, color: colors.text, marginBottom: 12 }}>Quick Overview</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
            <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.border }}>
              <Ionicons name="calendar-outline" size={24} color={colors.primary} />
              <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20, color: colors.text, marginTop: 6 }}>{stats.attendance}%</Text>
              <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.textSecondary }}>Attendance</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.border }}>
              <Ionicons name="time-outline" size={24} color={colors.primary} />
              <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20, color: colors.text, marginTop: 6 }}>{stats.upcomingClasses}</Text>
              <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.textSecondary }}>Upcoming Classes</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.border }}>
              <Ionicons name="document-text-outline" size={24} color={colors.primary} />
              <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20, color: colors.text, marginTop: 6 }}>{stats.assignmentsDue}</Text>
              <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.textSecondary }}>Assignments Due</Text>
            </View>
          </View>
        </View>

        {/* ========== NOTEPAD SECTION (NEW) ========== */}
        <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 18, color: colors.text, marginBottom: 12 }}>
            📝 Quick Notes
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: 14,
                paddingVertical: 10,
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.text,
                marginRight: 8,
              }}
              placeholder="Write a note..."
              placeholderTextColor={colors.textSecondary}
              value={newNote}
              onChangeText={setNewNote}
            />
            <TouchableOpacity
              onPress={addNote}
              style={{ backgroundColor: colors.primary, borderRadius: 12, padding: 10 }}
            >
              <Ionicons name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {notes.length === 0 ? (
            <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary, fontStyle: 'italic', textAlign: 'center', marginTop: 8 }}>
              No notes yet. Tap + to add.
            </Text>
          ) : (
            notes.map((note, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ flex: 1, fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.text }}>
                  {note}
                </Text>
                <TouchableOpacity onPress={() => deleteNote(index)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
        {/* ========== END NOTEPAD ========== */}

        {/* Daily Inspiration (Quote) */}
        <View style={{ marginHorizontal: 16, marginBottom: 24, backgroundColor: colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.primary} />
            <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 16, color: colors.text, marginLeft: 8 }}>Daily Inspiration</Text>
          </View>
          {quoteLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary, fontStyle: 'italic' }}>
              "{quote || 'Loading...'}"
            </Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={{ paddingHorizontal: 16, marginBottom: 32 }}>
          <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 18, color: colors.text, marginBottom: 16 }}>Quick Actions</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={{ flex: 1, backgroundColor: colors.surface, borderRadius: 12, padding: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: colors.border }}
            >
              <Ionicons name="create-outline" size={20} color={colors.primary} />
              <Text style={{ fontFamily: 'Inter_600SemiBold', color: colors.text }}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Courses')}
              style={{ flex: 1, backgroundColor: colors.surface, borderRadius: 12, padding: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: colors.border }}
            >
              <Ionicons name="book-outline" size={20} color={colors.primary} />
              <Text style={{ fontFamily: 'Inter_600SemiBold', color: colors.text }}>My Courses</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
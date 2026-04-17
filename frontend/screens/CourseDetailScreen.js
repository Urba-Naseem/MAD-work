// screens/CourseDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for each course (can be extended or fetched from AsyncStorage)
const courseDetailsMap = {
  '1': {
    instructor: 'Prof. Anum Aleem',
    officeHours: 'Mon/Wed 11:30 AM - 1:00 PM',
    email: 'anum.aleem@university.edu',
    attendance: 85,
    marks: {
      quizzes: { weight: 20, obtained: 18, total: 20 },
      midterm: { weight: 30, obtained: 24, total: 30 },
      final: { weight: 40, obtained: 35, total: 40 },
      assignments: { weight: 10, obtained: 9, total: 10 },
    },
    upcomingTopics: [
      { topic: 'Binary Trees - Advanced', date: 'Oct 25' },
      { topic: 'AVL Trees & Rotations', date: 'Oct 28' },
      { topic: 'Graph Algorithms Intro', date: 'Nov 1' },
    ],
  },
  '2': {
    instructor: 'Prof. Kausar Nasreen',
    officeHours: 'Tue/Thu 2:30 PM - 4:00 PM',
    email: 'kausar.nasreen@university.edu',
    attendance: 78,
    marks: {
      quizzes: { weight: 20, obtained: 16, total: 20 },
      midterm: { weight: 30, obtained: 22, total: 30 },
      final: { weight: 40, obtained: 30, total: 40 },
      assignments: { weight: 10, obtained: 8, total: 10 },
    },
    upcomingTopics: [
      { topic: 'React Hooks Deep Dive', date: 'Oct 26' },
      { topic: 'State Management (Redux)', date: 'Oct 29' },
      { topic: 'API Integration', date: 'Nov 2' },
    ],
  },
  '3': {
    instructor: 'Prof. Saleha Nasim',
    officeHours: 'Mon/Wed 12:00 PM - 3:30 PM',
    email: 'saleha.nasim@university.edu',
    attendance: 92,
    marks: {
      quizzes: { weight: 20, obtained: 19, total: 20 },
      midterm: { weight: 30, obtained: 28, total: 30 },
      final: { weight: 40, obtained: 38, total: 40 },
      assignments: { weight: 10, obtained: 10, total: 10 },
    },
    upcomingTopics: [
      { topic: 'SQL Joins & Subqueries', date: 'Oct 27' },
      { topic: 'Indexing & Optimization', date: 'Oct 30' },
      { topic: 'Transactions & ACID', date: 'Nov 3' },
    ],
  },
  '4': {
    instructor: 'Lec. Nayab Khalid',
    officeHours: 'Fri 12:00 PM - 2:00 PM',
    email: 'nayab.khalid@university.edu',
    attendance: 70,
    marks: {
      quizzes: { weight: 20, obtained: 14, total: 20 },
      midterm: { weight: 30, obtained: 20, total: 30 },
      final: { weight: 40, obtained: 28, total: 40 },
      assignments: { weight: 10, obtained: 7, total: 10 },
    },
    upcomingTopics: [
      { topic: 'Process Scheduling', date: 'Oct 25' },
      { topic: 'Memory Management', date: 'Oct 28' },
      { topic: 'File Systems', date: 'Nov 1' },
    ],
  },
  '5': {
    instructor: 'Lec. Naveera Ahmed',
    officeHours: 'Tue/Thu 11:00 AM - 12:30 PM',
    email: 'naveera.ahmed@university.edu',
    attendance: 88,
    marks: {
      quizzes: { weight: 20, obtained: 17, total: 20 },
      midterm: { weight: 30, obtained: 26, total: 30 },
      final: { weight: 40, obtained: 36, total: 40 },
      assignments: { weight: 10, obtained: 9, total: 10 },
    },
    upcomingTopics: [
      { topic: 'Agile Methodologies', date: 'Oct 26' },
      { topic: 'Requirements Engineering', date: 'Oct 29' },
      { topic: 'Software Testing', date: 'Nov 2' },
    ],
  },
  '6': {
    instructor: 'Prof. Seemab Karim',
    officeHours: 'Wed/Fri 2:00 PM - 3:30 PM',
    email: 'seemab.karim@university.edu',
    attendance: 81,
    marks: {
      quizzes: { weight: 20, obtained: 16, total: 20 },
      midterm: { weight: 30, obtained: 24, total: 30 },
      final: { weight: 40, obtained: 32, total: 40 },
      assignments: { weight: 10, obtained: 8, total: 10 },
    },
    upcomingTopics: [
      { topic: 'OSI Model Review', date: 'Oct 27' },
      { topic: 'TCP/IP Deep Dive', date: 'Oct 30' },
      { topic: 'Network Security Basics', date: 'Nov 3' },
    ],
  },
  '7': {
    instructor: 'Dr. Shumaila Qayyum',
    officeHours: 'Mon 2:00 PM - 4:00 PM',
    email: 'shumails.qayyum@university.edu',
    attendance: 95,
    marks: {
      quizzes: { weight: 20, obtained: 19, total: 20 },
      midterm: { weight: 30, obtained: 29, total: 30 },
      final: { weight: 40, obtained: 39, total: 40 },
      assignments: { weight: 10, obtained: 10, total: 10 },
    },
    upcomingTopics: [
      { topic: 'Search Algorithms', date: 'Oct 25' },
      { topic: 'Neural Networks Intro', date: 'Oct 28' },
      { topic: 'Natural Language Processing', date: 'Nov 1' },
    ],
  },
};

export default function CourseDetailScreen({ route, navigation }) {
  const { course } = route.params;
  const { colors, isDarkMode } = useTheme();
  const details = courseDetailsMap[course.id] || courseDetailsMap['1']; // fallback

  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [attendancePercentage, setAttendancePercentage] = useState(details.attendance);

  const handleAttendanceToggle = () => {
    if (!attendanceMarked) {
      setAttendanceMarked(true);
      setAttendancePercentage(prev => Math.min(prev + 2, 100));
      Alert.alert('Demo', 'Attendance marked for today! (+2%)');
    } else {
      Alert.alert('Info', 'You have already marked attendance for today.');
    }
  };

  // Calculate total marks percentage
  const marks = details.marks;
  const totalObtained = marks.quizzes.obtained + marks.midterm.obtained + marks.final.obtained + marks.assignments.obtained;
  const totalPossible = marks.quizzes.total + marks.midterm.total + marks.final.total + marks.assignments.total;
  const overallPercentage = ((totalObtained / totalPossible) * 100).toFixed(1);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      
      {/* Header with back button */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 12 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 22, color: colors.text, flex: 1 }} numberOfLines={1}>
          {course.name}
        </Text>
        <Ionicons name={course.icon === 'code-slash' ? 'code-slash' : 'book'} size={24} color={course.color} />
      </View>

      {/* Course Schedule */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="time-outline" size={18} color={colors.textSecondary} />
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary, marginLeft: 6 }}>
            {course.timings}
          </Text>
        </View>
      </View>

      {/* Instructor Card */}
      <View style={{ marginHorizontal: 20, marginBottom: 20, backgroundColor: colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border }}>
        <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 16, color: colors.text, marginBottom: 12 }}>Instructor</Text>
        <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 18, color: colors.primary }}>{details.instructor}</Text>
        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary, marginTop: 4 }}>Office Hours: {details.officeHours}</Text>
        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary }}>Email: {details.email}</Text>
      </View>

      {/* Attendance Section with Toggle */}
      <View style={{ marginHorizontal: 20, marginBottom: 20, backgroundColor: colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 16, color: colors.text }}>Attendance</Text>
          <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 18, color: colors.accent }}>{attendancePercentage}%</Text>
        </View>
        <View style={{ height: 8, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden', marginBottom: 16 }}>
          <View style={{ width: `${attendancePercentage}%`, height: '100%', backgroundColor: colors.accent, borderRadius: 4 }} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary }}>Mark today's attendance</Text>
          <Switch
            value={attendanceMarked}
            onValueChange={handleAttendanceToggle}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={attendanceMarked ? '#FFF' : '#FFF'}
          />
        </View>
      </View>

      {/* Marks Breakdown */}
      <View style={{ marginHorizontal: 20, marginBottom: 20, backgroundColor: colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border }}>
        <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 16, color: colors.text, marginBottom: 12 }}>Marks Breakdown</Text>
        {Object.entries(marks).map(([key, value]) => (
          <View key={key} style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.text }}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary }}>{value.obtained} / {value.total}</Text>
            </View>
            <View style={{ height: 6, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden' }}>
              <View style={{ width: `${(value.obtained / value.total) * 100}%`, height: '100%', backgroundColor: colors.primary, borderRadius: 3 }} />
            </View>
          </View>
        ))}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.border }}>
          <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 16, color: colors.text }}>Overall</Text>
          <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 16, color: colors.primary }}>{overallPercentage}%</Text>
        </View>
      </View>

      {/* Upcoming Topics */}
      <View style={{ marginHorizontal: 20, marginBottom: 30, backgroundColor: colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border }}>
        <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 16, color: colors.text, marginBottom: 12 }}>Upcoming Topics</Text>
        {details.upcomingTopics.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="calendar-outline" size={18} color={colors.primary} style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.text }}>{item.topic}</Text>
              <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.textSecondary }}>{item.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
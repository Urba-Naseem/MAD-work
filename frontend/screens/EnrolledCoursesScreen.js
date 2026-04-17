// screens/EnrolledCoursesScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const coursesData = [
  { id: '1', name: 'Data Structures & Algorithms', timings: 'Mon/Wed 10:00 AM - 11:30 AM', icon: 'code-slash', iconType: 'Ionicons', color: '#4A90E2' },
  { id: '2', name: 'Web Development', timings: 'Tue/Thu 1:00 PM - 2:30 PM', icon: 'globe', iconType: 'Ionicons', color: '#FF6B6B' },
  { id: '3', name: 'Database Management', timings: 'Mon/Wed 12:00 PM - 1:30 PM', icon: 'server', iconType: 'MaterialIcons', color: '#4CD964' },
  { id: '4', name: 'Operating Systems', timings: 'Fri 9:00 AM - 12:00 PM', icon: 'desktop', iconType: 'Ionicons', color: '#FF9F4A' },
  { id: '5', name: 'Software Engineering', timings: 'Tue/Thu 10:00 AM - 11:30 AM', icon: 'git-branch', iconType: 'FontAwesome5', color: '#AF52DE' },
  { id: '6', name: 'Computer Networks', timings: 'Wed/Fri 2:00 PM - 3:30 PM', icon: 'wifi', iconType: 'Ionicons', color: '#FF2D55' },
  { id: '7', name: 'Artificial Intelligence', timings: 'Mon 3:00 PM - 5:00 PM', icon: 'brain', iconType: 'FontAwesome5', color: '#34C759' },
];

const getIcon = (course) => {
  const size = 28;
  const color = course.color;
  if (course.iconType === 'Ionicons') return <Ionicons name={course.icon} size={size} color={color} />;
  if (course.iconType === 'MaterialIcons') return <MaterialIcons name={course.icon} size={size} color={color} />;
  if (course.iconType === 'FontAwesome5') return <FontAwesome5 name={course.icon} size={size} color={color} />;
  return <Ionicons name="book-outline" size={size} color={color} />;
};

export default function EnrolledCoursesScreen({ navigation }) {  // ← ADD navigation prop
  const { colors, isDarkMode } = useTheme();

  const renderCourseCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CourseDetail', { course: item })}  // ← REPLACE Alert with navigation
      activeOpacity={0.7}
      style={{
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 16,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: `${item.color}15`, justifyContent: 'center', alignItems: 'center' }}>
        {getIcon(item)}
      </View>
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 16, color: colors.text, marginBottom: 4 }}>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.textSecondary, marginLeft: 4 }}>{item.timings}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <View style={{ padding: 20, paddingTop: 12 }}>
        <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 28, color: colors.text, marginBottom: 8 }}>My Courses</Text>
        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary, marginBottom: 20 }}>{coursesData.length} enrolled courses</Text>
      </View>
      <FlatList
        data={coursesData}
        renderItem={renderCourseCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}
      />
    </View>
    </SafeAreaView>
  );
}
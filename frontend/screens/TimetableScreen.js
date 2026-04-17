// ./frontend/screens/TimetableScreen.js
import React from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const timetableData = {
  Monday: [
    { time: '10:00 AM - 11:30 AM', course: 'Data Structures & Algorithms', instructor: 'Prof. Anum Aleem', room: 'Room A-201' },
    { time: '12:00 PM - 1:30 PM', course: 'Database Management', instructor: 'Prof. Saleha Nasim', room: 'Lab B-213' },
    { time: '3:00 PM - 5:00 PM', course: 'Artificial Intelligence', instructor: 'Dr. Shumaila Qayyum', room: 'Room B-205' },
  ],
  Tuesday: [
    { time: '10:00 AM - 11:30 AM', course: 'Software Engineering', instructor: 'Lec. Naveera Ahmed', room: 'Room A-108' },
    { time: '1:00 PM - 2:30 PM', course: 'Web Development', instructor: 'Prof. Kausar Nasreen', room: 'Room A-202' },
  ],
  Wednesday: [
    { time: '10:00 AM - 11:30 AM', course: 'Data Structures & Algorithms', instructor: 'Prof. Anum Aleem', room: 'Room A-201' },
    { time: '12:00 PM - 1:30 PM', course: 'Database Management', instructor: 'Prof. Saleha Nasim', room: 'Lab B-213' },
    { time: '2:00 PM - 3:30 PM', course: 'Computer Networks', instructor: 'Prof. Seemab Karim', room: 'Room B-014' },
  ],
  Thursday: [
    { time: '10:00 AM - 11:30 AM', course: 'Software Engineering', instructor: 'Lec. Naveera Ahmed', room: 'Room A-108' },
    { time: '1:00 PM - 2:30 PM', course: 'Web Development', instructor: 'Prof. Kausar Nasreen', room: 'Room A-202' },
  ],
  Friday: [
    { time: '09:00 AM - 12:00 PM', course: 'Operating Systems', instructor: 'Lec. Nayab Khalid', room: 'Room B-211' },
    { time: '2:00 PM - 3:30 PM', course: 'Computer Networks', instructor: 'Prof. Seemab Karim', room: 'Lab A-214' },
  ],
};

const isCurrentClass = (timeSlot) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const [start, end] = timeSlot.split(' - ');
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  const currentTotal = currentHour * 60 + currentMinute;
  const startTotal = startHour * 60 + startMinute;
  const endTotal = endHour * 60 + endMinute;
  return currentTotal >= startTotal && currentTotal <= endTotal;
};

export default function TimetableScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 24, color: colors.text }}>Weekly Timetable</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        {days.map((day) => (
          <View key={day} style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Ionicons name="calendar-outline" size={20} color={colors.primary} />
              <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 18, color: colors.text, marginLeft: 8 }}>
                {day}
              </Text>
              {day === currentDay && (
                <View style={{ marginLeft: 12, backgroundColor: colors.accent, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 }}>
                  <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 10, color: '#FFF' }}>Today</Text>
                </View>
              )}
            </View>

            {timetableData[day]?.length > 0 ? (
              timetableData[day].map((item, idx) => {
                const isCurrent = day === currentDay && isCurrentClass(item.time);
                return (
                  <View
                    key={idx}
                    style={{
                      backgroundColor: isCurrent ? `${colors.accent}20` : colors.surface,
                      borderRadius: 12,
                      padding: 12,
                      marginBottom: 8,
                      borderWidth: 1,
                      borderColor: isCurrent ? colors.accent : colors.border,
                    }}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                      <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.text }}>{item.course}</Text>
                      <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.textSecondary }}>{item.time}</Text>
                    </View>
                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.textSecondary }}>{item.instructor}</Text>
                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.textSecondary }}>{item.room}</Text>
                    {isCurrent && (
                      <View style={{ marginTop: 6 }}>
                        <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 10, color: colors.accent }}>● Currently ongoing</Text>
                      </View>
                    )}
                  </View>
                );
              })
            ) : (
              <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary, fontStyle: 'italic', marginLeft: 28 }}>
                No classes scheduled
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
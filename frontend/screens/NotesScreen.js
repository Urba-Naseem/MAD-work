import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../hooks/useNotes';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../config/theme';
import Icon from '@expo/vector-icons/MaterialIcons';

const NotesScreen = ({ navigation }) => {
  const [newNote, setNewNote] = useState('');
  const [adding, setAdding] = useState(false);
  const { logout } = useAuth();
  const { notes, loading, addNote, deleteNote } = useNotes();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="logout" size={20} color="#fff" />
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: COLORS.primary },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: '600' },
    });
  }, [navigation]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => logout() },
    ]);
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) {
      Alert.alert('Error', 'Please write something');
      return;
    }
    setAdding(true);
    try {
      await addNote(newNote);
      setNewNote('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add note');
    } finally {
      setAdding(false);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Delete Note',
      'This action cannot be undone. Delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteNote(id), style: 'destructive' },
      ]
    );
  };

  const renderNote = ({ item }) => (
    <View style={styles.noteCard}>
      <View style={styles.noteContent}>
        <Text style={styles.noteText}>{item.text}</Text>
        <View style={styles.noteFooter}>
          <Icon name="access-time" size={14} color={COLORS.textLight} />
          <Text style={styles.noteDate}>
            {item.createdAt?.toDate?.()?.toLocaleString() || 'Just now'}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.deleteIcon}>
        <Icon name="delete-outline" size={24} color={COLORS.error} />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <LinearGradient colors={['#F2F2F7', '#FFFFFF']} style={styles.gradient}>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="What's on your mind?"
            placeholderTextColor={COLORS.textLight}
            value={newNote}
            onChangeText={setNewNote}
            multiline
          />
          <TouchableOpacity
            style={[styles.saveButton, adding && styles.disabledButton]}
            onPress={handleAddNote}
            disabled={adding}
          >
            {adding ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Icon name="add" size={20} color="#fff" />
                <Text style={styles.saveButtonText}>Add Note</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {notes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="note-add" size={80} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No notes yet</Text>
            <Text style={styles.emptyText}>Tap + to create your first note</Text>
          </View>
        ) : (
          <FlatList
            data={notes}
            renderItem={renderNote}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  inputSection: {
    backgroundColor: COLORS.card,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.small,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  disabledButton: { opacity: 0.6 },
  list: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.medium,
  },
  noteContent: { flex: 1 },
  noteText: { ...TYPOGRAPHY.body, fontSize: 16, lineHeight: 24 },
  noteFooter: { flexDirection: 'row', alignItems: 'center', marginTop: SPACING.sm, gap: 4 },
  noteDate: { ...TYPOGRAPHY.caption1, color: COLORS.textLight },
  deleteIcon: { padding: SPACING.sm, marginLeft: SPACING.sm },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl },
  emptyTitle: { ...TYPOGRAPHY.title2, marginTop: SPACING.md },
  emptyText: { ...TYPOGRAPHY.subhead, color: COLORS.textSecondary, marginTop: SPACING.xs },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  logoutButton: { marginRight: SPACING.md, padding: SPACING.sm, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: BORDER_RADIUS.sm },
});

export default NotesScreen;
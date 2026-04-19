import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../config/theme';
import Icon from '@expo/vector-icons/MaterialIcons';

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://reactnative.dev/movies.json');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setMovies(data.movies);
    } catch (err) {
      setError(err.message);
      Alert.alert('Error', 'Could not load movies');
    } finally {
      setLoading(false);
    }
  };

  // Helper to generate a random rating between 3.5 and 5.0
  const getRating = (index) => (3.5 + (index % 15) / 10).toFixed(1);

  // Generate a mock description based on the movie title
  const getDescription = (title) => {
    const descriptions = [
      `"${title}" is a cinematic masterpiece that takes you on an unforgettable journey. Critics praise its stunning visuals and compelling performances.`,
      `Experience the magic of "${title}" – a film that blends action, emotion, and breathtaking storytelling. A must-watch for all ages.`,
      `"${title}" has been hailed as one of the most influential films of its decade. Its groundbreaking direction and memorable score leave a lasting impression.`,
      `Dive into the world of "${title}" where every scene is crafted with precision. Audiences and critics agree: it's an instant classic.`,
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  const openModal = (movie, index) => {
    setSelectedMovie({
      ...movie,
      rating: getRating(index),
      description: getDescription(movie.title),
      genre: index % 2 === 0 ? 'Action / Adventure' : 'Drama / Sci-Fi',
      director: index % 3 === 0 ? 'Christopher Nolan' : index % 2 === 0 ? 'Steven Spielberg' : 'Greta Gerwig',
    });
    setModalVisible(true);
  };

  const renderMovie = ({ item, index }) => (
    <TouchableOpacity onPress={() => openModal(item, index)} activeOpacity={0.7}>
      <View style={styles.card}>
        <View style={styles.leftAccent} />
        <View style={styles.posterPlaceholder}>
          <Icon name="local-movies" size={32} color={COLORS.primary} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.metaRow}>
            <Icon name="event" size={14} color={COLORS.textSecondary} />
            <Text style={styles.year}>{item.releaseYear}</Text>
            <View style={styles.rating}>
              <Icon name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{getRating(index)}</Text>
            </View>
          </View>
        </View>
        <Icon name="chevron-right" size={24} color={COLORS.border} />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Icon name="movie-filter" size={80} color={COLORS.border} />
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorText}>Couldn't load movies</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchMovies}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#F2F2F7', '#FFFFFF']} style={styles.gradient}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎬 Cinema</Text>
        <Text style={styles.headerSubtitle}>Discover great films</Text>
      </View>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal for Movie Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedMovie?.title}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Icon name="close" size={24} color={COLORS.textSecondary} />
                </TouchableOpacity>
              </View>
              <View style={styles.modalMeta}>
                <View style={styles.modalYear}>
                  <Icon name="event" size={16} color={COLORS.primary} />
                  <Text style={styles.modalYearText}>{selectedMovie?.releaseYear}</Text>
                </View>
                <View style={styles.modalRating}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={styles.modalRatingText}>{selectedMovie?.rating} / 5.0</Text>
                </View>
              </View>
              <View style={styles.modalGenre}>
                <Icon name="theaters" size={16} color={COLORS.primary} />
                <Text style={styles.modalGenreText}>{selectedMovie?.genre}</Text>
              </View>
              <View style={styles.modalDirector}>
                <Icon name="person" size={16} color={COLORS.primary} />
                <Text style={styles.modalDirectorText}>Directed by {selectedMovie?.director}</Text>
              </View>
              <Text style={styles.modalDescription}>{selectedMovie?.description}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  header: {
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    ...TYPOGRAPHY.largeTitle,
    fontSize: 34,
    color: COLORS.text,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.subhead,
    color: COLORS.textSecondary,
  },
  list: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  leftAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderBottomLeftRadius: BORDER_RADIUS.lg,
  },
  posterPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  details: { flex: 1 },
  title: {
    ...TYPOGRAPHY.headline,
    fontSize: 16,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  year: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.textSecondary,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.textSecondary,
  },
  errorTitle: {
    ...TYPOGRAPHY.title1,
    marginTop: SPACING.md,
    color: COLORS.error,
  },
  errorText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  retryButton: {
    marginTop: SPACING.lg,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    width: '85%',
    maxHeight: '70%',
    ...SHADOWS.large,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  modalTitle: {
    ...TYPOGRAPHY.h2,
    fontSize: 20,
    flex: 1,
    marginRight: SPACING.md,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  modalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  modalYear: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modalYearText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  modalRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modalRatingText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.text,
  },
  modalGenre: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: SPACING.sm,
  },
  modalGenreText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  modalDirector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: SPACING.md,
  },
  modalDirectorText: {
    ...TYPOGRAPHY.body,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
  },
  modalDescription: {
    ...TYPOGRAPHY.body,
    lineHeight: 22,
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
});

export default MoviesScreen;
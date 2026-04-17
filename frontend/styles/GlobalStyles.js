import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#0F172A',
  card: '#1E293B',
  primary: '#FACC15',
  text: '#FFFFFF',
  subText: '#CBD5E1',
  border: '#334155',
};

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.subText,
    marginBottom: 25,
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },

  button: {
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginVertical: 8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    color: '#fff',
    marginBottom: 12,
  },
});

export default GlobalStyles;
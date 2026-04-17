// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'registeredUsers';
const CURRENT_USER_KEY = 'currentUserEmail';

// Default profile image placeholder
const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=4A90E2&color=fff&size=120&rounded=true&bold=true';

// Helper to get all users
const getUsers = async () => {
  const usersJson = await AsyncStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Helper to save users array
const saveUsers = async (users) => {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Get current logged-in user
export const getCurrentUser = async () => {
  const currentEmail = await AsyncStorage.getItem(CURRENT_USER_KEY);
  if (!currentEmail) return null;
  const users = await getUsers();
  return users.find(u => u.email === currentEmail) || null;
};

// Login user
export const loginUser = async (email, password) => {
  const users = await getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    await AsyncStorage.setItem(CURRENT_USER_KEY, email);
    return user;
  }
  return null;
};

// Signup new user
export const signupUser = async (email, password) => {
  const users = await getUsers();
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = {
    email,
    password,
    name: 'New Student',
    sapId: 'SAP' + Math.floor(10000 + Math.random() * 90000),
    semester: 'Fall 2024',
    gpa: '3.0',
    cgpa: '3.2',
    coursesText: 'Mathematics, Physics, Programming',
    profileImage: DEFAULT_AVATAR,
  };

  const updatedUsers = [...users, newUser];
  await saveUsers(updatedUsers);
  await AsyncStorage.setItem(CURRENT_USER_KEY, email);
  return newUser;
};

// Update user data
export const updateUserInStorage = async (updatedUser) => {
  const users = await getUsers();
  const userIndex = users.findIndex(u => u.email === updatedUser.email);
  if (userIndex !== -1) {
    users[userIndex] = updatedUser;
    await saveUsers(users);
    await AsyncStorage.setItem(CURRENT_USER_KEY, updatedUser.email);
  }
};

// Reset all data
export const resetAllData = async () => {
  await AsyncStorage.removeItem(USERS_KEY);
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
};

// Save initial demo user if no users exist
export const initializeDemoUser = async () => {
  const users = await getUsers();
  if (users.length === 0) {
    const demoUser = {
      email: 'student@example.com',
      password: 'password123',
      name: 'Alex Johnson',
      sapId: 'SAP2024001',
      semester: 'Fall 2024',
      gpa: '3.8',
      cgpa: '3.75',
      coursesText: 'Data Structures, Algorithms, Web Development',
      profileImage: DEFAULT_AVATAR,
    };
    await saveUsers([demoUser]);
  }
};
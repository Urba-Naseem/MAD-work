import { useState, useEffect } from 'react';
import { db, auth } from '../services/firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setNotes([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'notes'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notesData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching notes:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addNote = async (text) => {
    const user = auth.currentUser;
    if (!user || !text.trim()) return;
    await addDoc(collection(db, 'notes'), {
      text: text.trim(),
      userId: user.uid,
      createdAt: serverTimestamp(),
    });
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, 'notes', id));
  };

  return { notes, loading, addNote, deleteNote };
};
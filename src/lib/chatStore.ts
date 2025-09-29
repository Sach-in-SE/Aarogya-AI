import { db } from './firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, DocumentData } from 'firebase/firestore';

export async function addChatMessage(userId: string, message: { sender: 'user' | 'bot'; content: string; language: string }) {
  const ref = collection(db, 'users', userId, 'chats');
  await addDoc(ref, {
    ...message,
    createdAt: serverTimestamp()
  });
}

export function subscribeToChat(userId: string, callback: (docs: DocumentData[]) => void) {
  const ref = collection(db, 'users', userId, 'chats');
  const q = query(ref, orderBy('createdAt', 'asc'));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}



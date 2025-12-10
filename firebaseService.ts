import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  DocumentData,
} from 'firebase/firestore';
import type { AppData } from './types';
import { INITIAL_DATA } from './types';

// Firebase configuration - you can replace these values with env vars if desired
const firebaseConfig = {
  apiKey: "AIzaSyDr9e_uc5XBstiKFuh-jHtNV76j9ciPGA4",
  authDomain: "portfolio-89521.firebaseapp.com",
  projectId: "portfolio-89521",
  storageBucket: "portfolio-89521.firebasestorage.app",
  messagingSenderId: "475671118152",
  appId: "1:475671118152:web:eb9530caff6363cab7337d",
  measurementId: "G-TR5R9Z5SLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Single-document approach: store the whole app data in collection `app`, doc `data`
const APP_DOC_PATH = { collection: 'app', docId: 'data' };
const STORAGE_KEY = 'ankit_portfolio_firestore_fallback';

// Fallback to localStorage when Firestore unavailable
function getFromLocalStorage(): AppData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveToLocalStorage(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save to localStorage', e);
  }
}

export async function getAppData(): Promise<AppData> {
  try {
    const ref = doc(db, APP_DOC_PATH.collection, APP_DOC_PATH.docId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      console.log('✓ Firestore data loaded successfully');
      const data = snap.data() as AppData;
      saveToLocalStorage(data); // backup to localStorage
      return data;
    }
    // if not exists, create it with INITIAL_DATA
    console.warn('Document not found, creating with initial data');
    await saveAppData(INITIAL_DATA);
    return INITIAL_DATA;
  } catch (e: any) {
    console.error('❌ Firestore getAppData error:', e?.message);
    // Fallback to localStorage or INITIAL_DATA
    const local = getFromLocalStorage();
    if (local) {
      console.warn('⚠️ Using localStorage fallback (Firestore unavailable)');
      return local;
    }
    console.warn('Falling back to INITIAL_DATA');
    return INITIAL_DATA;
  }
}

export async function saveAppData(data: AppData): Promise<void> {
  let savedToFirestore = false;
  try {
    const ref = doc(db, APP_DOC_PATH.collection, APP_DOC_PATH.docId);
    await setDoc(ref, data, { merge: true });
    console.log('✓ Data saved to Firestore');
    savedToFirestore = true;
  } catch (e: any) {
    console.error('❌ Firestore saveAppData error:', e?.message);
  }
  
  // Always backup to localStorage as fallback
  saveToLocalStorage(data);
  
  if (!savedToFirestore) {
    console.warn('⚠️ Data saved to localStorage only (Firestore unavailable). Update Firestore Security Rules to enable Firestore sync.');
  }
}

export async function updateAppData(partial: Partial<AppData>): Promise<void> {
  let updatedFirestore = false;
  try {
    const ref = doc(db, APP_DOC_PATH.collection, APP_DOC_PATH.docId);
    await updateDoc(ref, partial as DocumentData);
    console.log('✓ Data updated in Firestore');
    updatedFirestore = true;
  } catch (e: any) {
    console.error('❌ Firestore updateAppData error:', e?.message);
  }

  // Fallback: read current data and merge locally
  if (!updatedFirestore) {
    try {
      const current = getFromLocalStorage() || INITIAL_DATA;
      const merged = { ...current, ...partial };
      saveToLocalStorage(merged);
      console.warn('⚠️ Update saved to localStorage only');
    } catch (e) {
      console.error('Failed to update localStorage', e);
    }
  }
}

// Generic helpers for uploading separate collections (if you store items as docs)
export async function addDocument(collectionName: string, payload: any) {
  const colRef = collection(db, collectionName);
  const res = await addDoc(colRef, payload);
  return res.id;
}

export async function deleteDocument(collectionName: string, docId: string) {
  const ref = doc(db, collectionName, docId);
  await deleteDoc(ref);
}

export default {
  app,
  db,
  getAppData,
  saveAppData,
  updateAppData,
  addDocument,
  deleteDocument,
};

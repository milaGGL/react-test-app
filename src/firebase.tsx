import { enablePersistentCacheIndexAutoCreation, getPersistentCacheIndexManager, initializeFirestore, persistentLocalCache } from "@firebase/firestore";
import { initializeApp, setLogLevel } from "firebase/app";


// Initialize Firebase
const firebaseConfig = {
  // Put in your config
  };

const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, { localCache: persistentLocalCache(/*settings*/{},) });
// Enable persistence.
const indexManager = getPersistentCacheIndexManager(db)!;
enablePersistentCacheIndexAutoCreation(indexManager);
export default db;
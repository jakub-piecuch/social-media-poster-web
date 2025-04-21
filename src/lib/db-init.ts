// src/lib/db-init.ts
import { connectToDatabase } from './mongoose';

// Flaga wskazująca, czy inicjalizacja już nastąpiła
let isInitialized = false;

// Funkcja inicjalizująca
const initDatabase = () => {
  // Sprawdź, czy inicjalizacja już nastąpiła
  if (isInitialized) {
    console.log('[MongoDB] 🔄 Database initialization skipped (already initialized)');
    return;
  }
  console.log('Przed otwarciem', isInitialized)
  
  connectToDatabase()
    .then(() => {
      console.log('[MongoDB] ✅ Database initialized on startup');
      isInitialized = true;
      console.log('Po otwarciu', isInitialized)

    })
    .catch((err) => {
      console.error('[MongoDB] ❌ Database initialization error:', err);
    });
};

// Automatyczne wywołanie przy imporcie
initDatabase();

// Eksport funkcji do ponownej inicjalizacji w razie potrzeby
export default initDatabase;
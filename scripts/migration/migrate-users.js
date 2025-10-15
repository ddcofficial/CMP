require('dotenv').config({ path: '../../.env' });
const admin = require('firebase-admin');
const mongoose = require('mongoose');
const User = require('../../services/auth-service/src/models/User');

// --- Firebase Initialization ---
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// --- MongoDB Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected for migration');
  } catch (err) {
    console.error('❌ MongoDB connection error', err);
    process.exit(1);
  }
};

const migrateUsers = async () => {
  await connectDB();

  try {
    const usersSnapshot = await db.collection('users').get();
    if (usersSnapshot.empty) {
      console.log('No users found in Firestore. Nothing to migrate.');
      return;
    }

    console.log(`Found ${usersSnapshot.docs.length} users in Firestore. Starting migration...`);

    for (const doc of usersSnapshot.docs) {
      const firestoreUser = doc.data();
      const existingUser = await User.findOne({ email: firestoreUser.email });

      if (existingUser) {
        console.log(`User with email ${firestoreUser.email} already exists in MongoDB. Skipping.`);
        continue;
      }

      // We need to generate a random password because we can't get the
      // original password from Firebase. Users will need to use the
      // "Forgot Password" feature to set a new one.
      const tempPassword = Math.random().toString(36).slice(-10);

      const newUser = new User({
        email: firestoreUser.email,
        password: tempPassword, // This will be hashed by the pre-save hook
        createdAt: firestoreUser.createdAt ? new Date(firestoreUser.createdAt) : new Date(),
      });

      await newUser.save();
      console.log(`Successfully migrated user: ${firestoreUser.email}`);
    }

    console.log('✅ User migration completed successfully!');
  } catch (error) {
    console.error('❌ Error during migration:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

migrateUsers();
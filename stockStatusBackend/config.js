'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
  HOST,
  PORT,
  HOST_URL,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_DATABASE_URL
} = process.env;

// Initialize Firebase app
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  databaseURL: FIREBASE_DATABASE_URL
};

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  firebaseConfig
};

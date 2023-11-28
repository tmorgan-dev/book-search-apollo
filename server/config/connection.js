const mongoose = require('mongoose');

// Use the MONGODB_URL environment variable if available, otherwise use a default local URI
const dbURI = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/googlebooks';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Event listeners for Mongoose connection
db.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

db.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Close Mongoose connection when the Node process exits
process.on('SIGINT', () => {
  db.close(() => {
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
  });
});

module.exports = db;

// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

// module.exports = mongoose.connection;

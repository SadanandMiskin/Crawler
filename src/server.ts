import express from 'express';
import passport from 'passport';
import session from 'express-session';
import GitHubStrategy from 'passport-github2';
import jwt from 'jsonwebtoken';
import cron from 'node-cron';
import path from 'path';
import { fileURLToPath } from 'url';

import githubLogin from './routes/githubLogin.js';
import userRoutes from './routes/userRoutes.js';
import { connectDb } from './config/db.js';
import { newIssue } from './functions/newIssue.js';

const app = express();
const __dirname = path.dirname(require.main.filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../assets')));

app.use(express.json());
app.use(session({
  secret: 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((id, cb) => {
  // Add implementation to find user by ID
  cb(null, id);
});

app.use(githubLogin);
app.use(userRoutes);

connectDb()

cron.schedule('*/1 * * * *', () => {
  newIssue().catch((err) => {
    console.error('Error running newIssue:', err);
  });
});

app.listen(3000, () => {
  console.log('Server started');
}).on('error', (err) => {
  console.error('Error starting server:', err);
});
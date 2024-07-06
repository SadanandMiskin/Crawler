// auth.ts
import passport from 'passport';
import { Strategy as GitHubStrategy, Profile } from 'passport-github';
import user from '../model/user.js';

const GITHUB_CLIENT_ID :any = process.env.client;
const GITHUB_CLIENT_SECRET :any= process.env.secret;
const callback = process.env.callbackURL

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error('Missing required environment variables: GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET');
}

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: callback
  },
  (accessToken: string, refreshToken: string, profile: Profile, cb) => {
     
   
    return cb(null, profile);
  }
))

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, { id });
});



export function ensureAuthenticated(req: any, res: any, next:any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

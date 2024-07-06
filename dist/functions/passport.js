// auth.ts
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
const GITHUB_CLIENT_ID = process.env.client;
const GITHUB_CLIENT_SECRET = process.env.secret;
const callback = process.env.callbackURL;
if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error('Missing required environment variables: GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET');
}
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: callback
}, (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
}));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((id, done) => {
    done(null, { id });
});
export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

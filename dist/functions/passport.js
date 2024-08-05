"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = ensureAuthenticated;
// auth.ts
const passport_1 = __importDefault(require("passport"));
const passport_github_1 = require("passport-github");
const GITHUB_CLIENT_ID = process.env.client;
const GITHUB_CLIENT_SECRET = process.env.secret;
const callback = process.env.callbackURL;
if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error('Missing required environment variables: GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET');
}
passport_1.default.use(new passport_github_1.Strategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: callback
}, (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((id, done) => {
    done(null, { id });
});
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

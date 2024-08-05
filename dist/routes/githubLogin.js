"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
// const __dirname = path.dirname(require.main.filename);
const router = express_1.default.Router();
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/login');
    });
});
router.get('/auth/github', passport_1.default.authenticate('github'));
router.get('/auth/github/callback', passport_1.default.authenticate('github', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/');
});
router.get('/login', (req, res) => {
    res.render('login');
});
exports.default = router;

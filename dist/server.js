"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const node_cron_1 = __importDefault(require("node-cron"));
const path_1 = __importDefault(require("path"));
const githubLogin_js_1 = __importDefault(require("./routes/githubLogin.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const db_js_1 = require("./config/db.js");
const newIssue_js_1 = require("./functions/newIssue.js");
const app = (0, express_1.default)();
// const __dirname = path.dirname(require.main.filename);
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express_1.default.static(path_1.default.join(__dirname, '../assets')));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.serializeUser((user, cb) => {
    cb(null, user);
});
passport_1.default.deserializeUser((id, cb) => {
    // Add implementation to find user by ID
    cb(null, id);
});
app.use(githubLogin_js_1.default);
app.use(userRoutes_js_1.default);
(0, db_js_1.connectDb)();
node_cron_1.default.schedule('*/1 * * * *', () => {
    (0, newIssue_js_1.newIssue)().catch((err) => {
        console.error('Error running newIssue:', err);
    });
});
app.listen(3000, () => {
    console.log('Server started');
}).on('error', (err) => {
    console.error('Error starting server:', err);
});

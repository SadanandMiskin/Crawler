"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport_js_1 = require("../functions/passport.js");
const user_js_1 = __importDefault(require("../model/user.js"));
const checkUrl_js_1 = require("../functions/checkUrl.js");
var Id;
router.get('/', passport_js_1.ensureAuthenticated, async (req, res) => {
    const user = req.user;
    const { email, login, id } = user.id._json;
    Id = id;
    try {
        const userDetail = await user_js_1.default.findOne({ githubId: id });
        if (userDetail) {
            return res.render('home', { userDetail: userDetail });
        }
        else {
            const user = await user_js_1.default.create({
                githubId: id,
                username: login,
                email: email,
                date: new Date().toString()
            });
            return res.render('home', { userDetail: user });
        }
    }
    catch (error) {
        res.json(error);
    }
});
router.post('/link', passport_js_1.ensureAuthenticated, async (req, res) => {
    const { url, email } = req.body;
    console.log('URLLLLL', url);
    try {
        // const usr: any = req.user
        const id = Id;
        const { username, repoName } = (0, checkUrl_js_1.checkUrl)(url);
        const userData = await user_js_1.default.findOne({ githubId: id });
        const present = userData?.repos.find(item => item.repoLink == url);
        if (userData?.email == null) {
            await user_js_1.default.findOneAndUpdate({ githubId: id }, { email: email });
            await userData?.save();
        }
        // const issues = await fetchGithubIssue(username , repoName) 
        if (present) {
            return res.json({ msg: 'already present' });
        }
        else {
            userData?.repos.push({ repoLink: url, date: new Date().toString() });
            //    console.log('arr ', userData)
            await userData?.save();
            res.redirect('/');
        }
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
});
router.post('/deleteRepo', passport_js_1.ensureAuthenticated, async (req, res) => {
    try {
        const { uid, repid } = req.query;
        await user_js_1.default.updateOne({ _id: uid }, { $pull: { repos: { _id: repid } } });
        console.log('done');
        res.redirect('/');
    }
    catch (error) {
        res.json(error);
    }
});
exports.default = router;

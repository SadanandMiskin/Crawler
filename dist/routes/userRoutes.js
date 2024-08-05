import express from 'express';
const router = express.Router();
import { ensureAuthenticated } from '../functions/passport.js';
import userModel from '../model/user.js';
import { checkUrl } from '../functions/checkUrl.js';
var Id;
router.get('/', ensureAuthenticated, async (req, res) => {
    const user = req.user;
    const { email, login, id } = user.id._json;
    Id = id;
    try {
        const userDetail = await userModel.findOne({ githubId: id });
        if (userDetail) {
            return res.render('home', { userDetail: userDetail });
        }
        else {
            const user = await userModel.create({
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
router.post('/link', ensureAuthenticated, async (req, res) => {
    const { url, email } = req.body;
    console.log('URLLLLL', url);
    try {
        // const usr: any = req.user
        const id = Id;
        const { username, repoName } = checkUrl(url);
        const userData = await userModel.findOne({ githubId: id });
        const present = userData?.repos.find(item => item.repoLink == url);
        if (userData?.email == null) {
            await userModel.findOneAndUpdate({ githubId: id }, { email: email });
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
router.post('/deleteRepo', ensureAuthenticated, async (req, res) => {
    try {
        const { uid, repid } = req.query;
        await userModel.updateOne({ _id: uid }, { $pull: { repos: { _id: repid } } });
        console.log('done');
        res.redirect('/');
    }
    catch (error) {
        res.json(error);
    }
});
export default router;

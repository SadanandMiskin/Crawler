"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newIssue = void 0;
const user_js_1 = __importDefault(require("../model/user.js"));
const fetchRepo_js_1 = require("./fetchRepo.js");
const sendMail_js_1 = require("./sendMail.js");
async function newIssue() {
    const users = await user_js_1.default.find();
    for (let user of users) {
        for (let repo of user.repos) {
            const [owner, repoName] = repo.repoLink.split('/').slice(-2);
            const userDetail = await (0, fetchRepo_js_1.fetchGithubIssue)(owner, repoName);
            for (let issue of userDetail.data) {
                if (new Date(issue.updated_at) > new Date(repo.date)) {
                    repo.date = issue.updated_at;
                    await user.save();
                    await (0, sendMail_js_1.sendMail)(user.email, issue.html_url, issue.title, issue.body);
                    console.log('new');
                }
                else {
                    console.log('old ');
                }
            }
        }
    }
}
exports.newIssue = newIssue;

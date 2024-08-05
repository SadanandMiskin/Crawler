"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGithubIssue = fetchGithubIssue;
const core_1 = require("@octokit/core");
const auth = process.env.OCTOKIT;
const octokit = new core_1.Octokit({
    auth: auth
});
function fetchGithubIssue(username, repoName) {
    return octokit.request('GET /repos/{owner}/{repo}/issues?state=open&sort=created', {
        owner: username,
        repo: repoName,
        per_page: 10
    });
    // console.log('sdssdsasaddadsd' ,ans)
}

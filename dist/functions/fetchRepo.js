import { Octokit } from "@octokit/core";
const auth = process.env.OCTOKIT;
const octokit = new Octokit({
    auth: auth
});
export function fetchGithubIssue(username, repoName) {
    return octokit.request('GET /repos/{owner}/{repo}/issues?state=open&sort=created', {
        owner: username,
        repo: repoName,
        per_page: 10
    });
    // console.log('sdssdsasaddadsd' ,ans)
}

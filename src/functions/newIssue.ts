import user from "../model/user.js";
import { fetchGithubIssue } from "./fetchRepo.js";
import { sendMail } from "./sendMail.js";

export async function newIssue() {
    const users = await user.find()


    for(let user of users){
        for(let repo of user.repos){
            const [owner, repoName] = repo.repoLink.split('/').slice(-2)
            
           
            const userDetail = await fetchGithubIssue(owner , repoName)
            
            for(let issue of userDetail.data){
             

                if(new Date(issue.updated_at) > new Date(repo.date)  ){
                    repo.date = issue.updated_at
                    await user.save()

                    await sendMail(user.email , issue.html_url, issue.title ,issue.body)
                    console.log('new')
                }
                else{
                    console.log('old ')
                    
                }

            }
        }
    }
}
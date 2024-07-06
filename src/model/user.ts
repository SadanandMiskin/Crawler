import mongoose from 'mongoose'


interface User {
    githubId: string,
    username: string,
    email: string,
    repos: Array<{
        repoLink: string,
        date: string
    }>
}

const userSchema = new mongoose.Schema({

        githubId: String,
        username: String,
        email: String,
        repos: [{
            repoLink: String,
            date: String
        }]

}) 

export default mongoose.model<User>('user' ,userSchema)
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    githubId: String,
    username: String,
    email: String,
    repos: [{
            repoLink: String,
            date: String
        }]
});
export default mongoose.model('user', userSchema);

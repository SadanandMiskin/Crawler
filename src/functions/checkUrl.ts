export function checkUrl(repoURL: any )  {

    // console.log('dfdf,' ,repoURL)
    const regex = /^(?:https|git)(?::\/\/|@)([\w.-]+)(?::|\/)([\w.-]+)\/([\w.-]+)$/
    const match = repoURL.match(regex)

    // console.log('dfdfdfd' ,match)

    if (match) {
        const [, , username, repoName] = match
        // console.log(username, repoName)
        // console.log('crct')
        return {username, repoName}
    } else {
        console.log('wronggg')
        return {
            username: 'errrr',
            repoName: 'errr'
        }
    }
}
export const validateUsername = (username: string | undefined) => {
    if(!username)
        return {error: 'Invalid Username!'}
    if(username.length <4)
        return {error: 'Username is too short(Enter atleast 4 characters)'};
    if(username.includes(' '))
        return {error: 'Username should not contain spaces'};
    return {isValid: true};
}


export const validatePassword = (password: string | undefined) => {
    if(!password)
        return {error: 'Invalid password!'}
    if(password.length <8)
        return {error: 'Password is too short(Enter atleast 8 characters)'};
    const regex = /[!@#$%^&*\-+=<>,.?]/;
    if (!regex.test(password))
        return {error: 'Password should contain atleast one special character(!@#$%^&*\-+=<>,.?)'};
    return {isValid: true};
}


export const validateTags = (tags: string | undefined) => {
    const regex = /[!@#$%^&*()\+={}[\]:;"'<>,.?\/|\\]/;
    if(tags && regex.test(tags))
        return {error: 'Tags should not contain special characters!'};
    return {isValid: true};
}
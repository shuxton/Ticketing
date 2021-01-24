import buildClient from '../api/build-client';

const LandingPage= ({currentUser})=>{
    if(currentUser)
    return <h1>You are signed in</h1>
    else
    return <h1>You are signed out</h1>
}

LandingPage.getInitialProps= async (context)=>{
        const { data } = await buildClient(context).get('/api/users/currentuser')
        return data;
}



export default LandingPage
import React from 'react';

const authorizationUri = 'https://accounts.spotify.com/authorize';

class Home extends React.Component {

    getToken(){
        const clienId = process.env.CLIENT_ID;
        const redirectUri = 'http://localhost:8080';
        
        window.open(`${authorizationUri}?client_id=${clienId}&response_type=token&redirect_uri=${redirectUri}`);
    }

    render() {
        return (
            <button className="btn btn-success btn-block btn-lg" onClick={ this.getToken } >Get Albums</button>
        );
    }
}

export default Home;
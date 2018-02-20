import React from 'react';

const authorizationUri = 'https://accounts.spotify.com/authorize';

class Home extends React.Component {

    getToken(){
        const clienId = 'c0db87b959e04ef586f2cc8a4e41b942';
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
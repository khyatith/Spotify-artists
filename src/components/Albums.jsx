import React from 'react';
import base64 from 'base-64';
import InfiniteScroll from 'react-infinite-scroll-component';
import NotificationSystem from 'react-notification-system';
import ClientOAuth2 from 'client-oauth2';

const ACCESS_TOKEN = 'BQChgRVBo-dRKBKPyaaCVuZ4F9PbQ8BsWcE6oK3RJmVmpqjFnZVKaBwd_UrIUKux3le4qD25TtVr4KxlffbPLL74qDmA-JU1hkEItQBzG5O1LhcpM6uWoiPoWYn3JCX8Be1ktsTuKDgAWP4E8C_Q3Jcyw6T3qg8';
//const URL = 'https://api.spotify.com/v1/artists/0oSGxfWSnnOXhD2fKuz2Gy/albums';

var spotifyAuth = new ClientOAuth2({
  clientId: 'c0db87b959e04ef586f2cc8a4e41b942',
  clientSecret: '437c81976429408197b0e475501c512b',
  accessTokenUri: 'https://accounts.spotify.com/api/token',
  authorizationUri: 'https://accounts.spotify.com/authorize',
  redirectUri: 'http://localhost:8080',
})

class Albums extends React.Component {

    constructor() {
        super();
        this.state = {
            allAlbums: [],
            limit: 10,
            hasMore: true,
            token: ''
        };
    }

    _addNotification(error) {
        this._notificationSystem.addNotification({
          message: error,
          level: 'error'
        });
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }

    callAPI() {
        const { limit } = this.state;

        fetch(`${URL}?market=ES&album_type=album&limit=${limit}&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON',
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        })
        .then(response => {
                return response.json();
        })
        .then(albums => {
            const { items } = albums;
            if (!items) {
                this.setState({ hasMore: false });
            } else {
                const albumData = items.map(item => {
                    const result = [];
                    const { images, name, external_urls } = item;
                    result.push(name, images[0].url, external_urls.spotify);
                    return result;
                });
                this.setState({ allAlbums: albumData });
            }
        })
        .then(() => this.setState({ limit: limit+10 }) )
        .catch(error => {
            this._addNotification(error.toString());
        })
    }

    getToken() {
        window.open(spotifyAuth.token.getUri());
        spotifyAuth.token.getToken(`http://localhost:8080`)
            .then(response => {
                return response;
            })
            .then(resp => {
                console.log(resp);
            })
    }


    render() {
        const { allAlbums, hasMore, token } = this.state;
        console.log(token);
        return (
            <div>
                {
                    !token && <button className="btn btn-success btn-block btn-lg" type="submit" onClick={ this.getToken }>Get Albums</button>
                }
                <NotificationSystem ref="notificationSystem" />
                { token &&
                <InfiniteScroll
                    next={ this.callAPI.bind(this) }
                    hasMore={ hasMore }
                    loader={ <div className="loader"></div> }
                >
                { allAlbums && allAlbums.map((album,i) => {
                        return (
                             <div className="card" key={i}>
                                <img className="card-img-top" src={album[1]} alt="Card image cap" />
                                <div className="card-block">
                                    <p className="card-title">{album[0]}</p>
                                    <a href={album[2]} target="_blank" className="btn btn-primary btn-block btn-lg">Open</a>
                                </div>
                            </div>
                        );
                    })
                }
                </InfiniteScroll>
            }
            </div>
        )
    }
}

export default Albums;
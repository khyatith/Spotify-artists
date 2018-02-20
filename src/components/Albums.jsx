import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NotificationSystem from 'react-notification-system';

class Albums extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allAlbums: [],
            limit: 10,
            hasMore: true,
            token: ''
        };
    }

    //before component mounts, we ll extract the accessToken from the url params
    componentWillMount() {
        const { accessToken } = this.props.params ? this.props.params : '';
        this.setState(({ token }) => ({ token: accessToken }));
    }

    //any errors will be displayed through this notification system
    _addNotification(error) {
        this._notificationSystem.addNotification({
          message: error,
          level: 'error'
        });
    }

    //we call the api with the access token credentials after the component has finished mounting
    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
        this.callAPI();
    }

    callAPI() {
        const { limit, token } = this.state;
        if (!token) {
            throw 'No token resturned from the api';
        }
        //call API endpoint with the token
        fetch(`https://api.spotify.com/v1/artists/0oSGxfWSnnOXhD2fKuz2Gy/albums?market=ES&album_type=album&limit=${limit}&offset=0`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
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
                // albumData is an array of objects like: [{0: name, 1: imageUrl, 2: externalUrls}]
                this.setState({ allAlbums: albumData });
            }
        })
        .then(() => this.setState({ limit: limit+10 }) )
        .catch(error => {
            this._addNotification(error.toString());
        })
    }


    render() {
        const { allAlbums, hasMore, token } = this.state;
        return (
                <div>
                    <NotificationSystem ref="notificationSystem" />
                    <header className="container-fluid">
                        <h4>Album App</h4>
                    </header>
                    <div className="container">
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
                    </div>
            </div>
        )
    }
}

export default Albums;
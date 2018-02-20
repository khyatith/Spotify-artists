import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Albums from '../../../src/components/Albums.jsx';
import fetchMock from 'fetch-mock';

configure({ adapter: new Adapter() });

fetchMock.get(`*`, JSON.stringify({'Test': 'This is a test'}));

describe('<Albums />', () => {

    let wrapper;

    //componentWillMount test
    it('get the url params from prop in componentWillMount', () => {
        const spy = jest.spyOn(Albums.prototype, 'componentWillMount');
        const match = { accessToken: 'foo' };
        wrapper = shallow(<Albums params={match} />);
        wrapper.instance().componentWillMount();
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
    });

    // componentDidMount is called
    it('mounts', () => {
        const spy = jest.spyOn(Albums.prototype, 'componentDidMount');
        const match = { accessToken: 'foo' };
        wrapper = shallow(<Albums params={match} />);
        wrapper.setState({ limit: 1, token: 'fakeToken'});
        wrapper.instance().componentDidMount();
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
    });

    //testing fetch from API
    it('calls the API and populates the state', () => {
        const callAPI = jest.fn();
        const match = { accessToken: 'foo' };
        wrapper = shallow(<Albums params={match} />);
        wrapper.setState({ limit: 1, token: 'fakeToken' });
        fetchMock.get('https://api.spotify.com/v1/artists/0oSGxfWSnnOXhD2fKuz2Gy/albums?market=ES&album_type=album&limit=1&offset=0', JSON.stringify({
                "items" : [ {
                    "album_type" : "album",
                    "name" : "A New Career In A New Town (1977 - 1982)",
                    "release_date" : "2017-09-29",
                    "release_date_precision" : "day",
                    "type" : "album",
                    "uri" : "spotify:album:6DcvIymXDe8sCD1u0fzi8J",
                    "artists" : [ {
                      "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0oSGxfWSnnOXhD2fKuz2Gy"
                      },
                      "href" : "https://api.spotify.com/v1/artists/0oSGxfWSnnOXhD2fKuz2Gy",
                      "id" : "0oSGxfWSnnOXhD2fKuz2Gy",
                      "name" : "David Bowie",
                      "type" : "artist",
                      "uri" : "spotify:artist:0oSGxfWSnnOXhD2fKuz2Gy"
                }]
            }]
        }));
        wrapper.instance().callAPI();
        expect(wrapper.state().allAlbums).toBeDefined();
    });
})

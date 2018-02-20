import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Albums from '../../../src/components/Albums.jsx';
import fetchMock from 'fetch-mock';

configure({ adapter: new Adapter() });

fetchMock.get(`*`, JSON.stringify({'Test': 'This is a test'}));

describe('<Albums />', () => {

    let wrapper;

    it('mounts', () => {
        const spy = jest.spyOn(Albums.prototype, 'componentDidMount');
        wrapper = mount(<Albums />);
        wrapper.instance().componentDidMount();
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
    });

    it('calls the API and populates the state', () => {
        const callAPI = jest.fn();
        wrapper = mount(<Albums />);
        wrapper.setState({ limit: 1 });
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

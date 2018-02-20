# Spotify-artists

# Background

Use the Spotify REST API (https://developer.spotify.com/web-api/) to retrieve results from the https://api.spotify.com/v1/artists/0oSGxfWSnnOXhD2fKuz2Gy/albums endpoint.

# Things to look for

- List the first 10 albums returned.
- Show the album thumbnail picture
- Show the album name
- Clicking on the “open” button opens the album in Spotify
- Unit Tests
- Responsive App
- Infinite Scrolling
- Webpack bundler

# Tech Stack

1. Library : React.js, react-router, infinite scrolling, bootstrap 4 for css
2. bundler: webpack
3. unit testing: jest

# Instructions to run the app

1. Add CLIENT_ID as environment variable CLIENT_ID=<your client id from spotify>
2. Clone the repo
3. cd Spotify-artists
4. npm install OR yarn install
5. npm start OR yarn start : Open the app on localhost:8080
6. To run tests, yarn test OR npm test
  
# App Workflow

1. When you open the app on localhost:8080, it shows a button 'Open Albums'
2. Clicking on the button, wil redirect the user to the spotify API for authorization using implicit grant.
3. On accepting the authorization, the main page opens up with David bowie albums.
4. The page is fully responsive down to 320px screen width.
5. Clicking on 'open' button will open up the album in spotify


Looking forward to the feeback !

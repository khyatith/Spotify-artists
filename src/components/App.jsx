import React from 'react';
import '../App.css';
import Albums from './Albums.jsx';

class App extends React.Component {
    render() {
        return (
            <div>
                <header className="container-fluid">
                    <h4>Album App</h4>
                </header>
                <div className="container">
                    <Albums />
                </div>
            </div>
        );
    }
}

export default App;
import React from 'react';
import Particles from 'react-particles-js'; 

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input_image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }    
  }

  displayFaceBox = (calculatedBox) => {
    this.setState({box: calculatedBox});
    // console.log(this.state.box);
  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onImageSubmit = () => {
    this.setState({imageUrl: this.state.input});

    fetch('http://localhost:5000/imageurl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:5000/image', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.user.id
            })  
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(err => console.log(err))
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => {
        console.log(err);
    });
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  render() {
    const {isSignedIn, box, imageUrl, route} = this.state;
    return (
      <div className="App">
        <Particles 
          className='particles'
          params={particlesOptions} 
        />
        <div className='header'>
          <Logo />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        </div>
        {route === 'home' 
          ? <React.Fragment>
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onImageSubmit={this.onImageSubmit}
              />        
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </React.Fragment>
          : (
              route === 'signin' 
               ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
               : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            ) 
        }
      </div>
    );
  }
}

export default App;

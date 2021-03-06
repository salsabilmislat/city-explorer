import React from 'react';
import CityForm from './component/CityForm';
import CityList from './component/CityList';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';
import Movies from './component/Movies';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      locationData: {},
      showLocationDetail: false,
      showErrorMessage: false,
      errorMessage: '',
      listOfWeather: [],
      listOfMovie:[]

    }
  }

  getTheCityName = async (cityName) => {
    await this.setState({
      locationName: cityName
    })
    console.log(this.state.locationName);
    this.getData();
  }
  
  getData = async () => {
    try {
      let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationName}&format=json`

      
      let response = await axios.get(url);

     await this.setState({
        locationData: response.data[0],

      })
      console.log(this.state.locationData);

      let serverUrl = `${process.env.REACT_APP_SERVER_URL}/weather?lon=${this.state.locationData.lon}&lat=${this.state.locationData.lat}`;

      let serverUrl1=`${process.env.REACT_APP_SERVER_URL}/movies?query=${this.state.locationName}`;
      

      let serverResponse = await axios.get(serverUrl);

      let serverResponse1 = await axios.get(serverUrl1);

      console.log(response.data[0]);
      console.log(serverResponse1);
      
       await this.setState({
        
        showLocationDetail: true,
        showErrorMessage: false,
        errorMessage: '',
        listOfWeather:serverResponse.data,
        listOfMovie:serverResponse1.data
      
      
      });
      console.log(this.state.locationData);
    }
    
    catch (err) {
      
      this.setState({
        showErrorMessage: true,
        errorMessage: err.message,
        showLocationDetail: false

      });
      
    }
  }


  render() {
    return (
      <div>
        {
          this.state.showErrorMessage &&

          <Alert variant="danger">
            {this.state.errorMessage}
          </Alert>
        }
        <CityForm getTheCityName={this.getTheCityName} />
        {
          this.state.showLocationDetail &&
          <CityList locationData={this.state.locationData} listOfWeather={this.state.listOfWeather} />
        }
       
        
          <Movies listOfMovie={this.state.listOfMovie}/>
        
      </div>
    );
  }
}

export default App;

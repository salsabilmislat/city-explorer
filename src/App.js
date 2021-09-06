import React from 'react';
import CityForm from './component/CityForm';
import CityList from './component/CityList';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      locationData: {},
      showLocationDetail: false,
      showErrorMessage: false,
      errorMessage: ''
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
      console.log(response.data[0]);
      this.setState({
        locationData: response.data[0],
        showLocationDetail: true,
        showErrorMessage: false,
        errorMessage: ''
      });
    }
    catch (err) {
      
      this.setState({
        showErrorMessage: true,
        errorMessage: err.message,
        showLocationDetail: false

      });
      console.log(this.state.errorMessage);
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
          <CityList locationData={this.state.locationData} />
        }
      </div>
    );
  }
}

export default App;

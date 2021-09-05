import React from 'react';
import CityForm from './component/CityForm';
import CityList from './component/CityList';
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      locationData: ''
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

    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationName}&format=json`

    let response = await axios.get(url);
    console.log(response.data[0]);
    this.setState({
      locationData: response.data[0]
    });

  }
  render() {
    return (
      <div>
        <CityForm getTheCityName={this.getTheCityName} />
        <CityList locationData={this.state.locationData} />
      </div>
    );
  }
}

export default App;

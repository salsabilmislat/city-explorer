import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CityForm extends React.Component {
constructor(props){
super (props);
this.state={
    locationName:''
}
}
    handleLocationNameChange = (e) => {
        this.setState({
            locationName: e.target.value
        })
    }
    
    handleSubmit=(e)=>{
        e.preventDefault();
       this.props.getTheCityName(this.state.locationName);
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter The City: </Form.Label>
                        <Form.Control type="text"  onChange={this.handleLocationNameChange} placeholder="Enter city name" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Explore!
                    </Button>
                </Form>
            </div>
        );
    }
}

export default CityForm;

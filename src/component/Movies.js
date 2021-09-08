import React from 'react';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

class Movies extends React.Component {

    render() {
       
        console.log(this.props.listOfMovie);
        return (

            this.props.listOfMovie.map(item => {
                return (
                    <Card  style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt='' />
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                Overview: {item.overview}
                            </Card.Text>
                            <Card.Text>
                                Average_votes : {item.vote_average}
                            </Card.Text>
                            <Card.Text>
                                Total_votes : {item.vote_count}
                            </Card.Text>
                            <Card.Text>
                                Popularity : {item.popularity}
                            </Card.Text>
                            <Card.Text>
                                Released_on : {item.release_date}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )


            }));

    }
}

export default Movies;
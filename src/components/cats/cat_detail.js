import React, { Component } from 'react';
import axios from 'axios';
import {Card, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class CatDetail extends Component {
    state = {
        cat: {},
        imageUrl: '',
        hasData: 0
    }

    componentDidMount() {
        let { id } = this.props.match.params
        let that = this;
        

        axios.get('https://api.thecatapi.com/v1/images/' + id, {
            headers: {
                "x-api-key": "DEMO-API-KEY"
            }
        })
          .then(function (response) {
           
            let data = response.data;
           
            that.setState({
                cat: data.breeds[0],
                imageUrl: data.url,
                hasData: 1
            });

          })
          .catch(function (error) {
            console.log(error);
          })
    }

    backHandler = () => {
        this.props.history.goBack();
    }

    render(){
        
        let template = <h2>Loading...</h2>

        if(this.state.hasData) {
            template = <Card className="text-left">
            <Card.Header>
                <h3 className="float-left">{this.state.cat.name}</h3>
                <button onClick={this.backHandler} className="btn btn-primary btn-sm float-right">Back</button>
                
                
            </Card.Header>
            <Card.Img src={this.state.imageUrl} />
            <Card.Body>
                <div><strong>Origin:</strong> {this.state.cat.origin}</div>
                <div><strong>Temperament:</strong> {this.state.cat.temperament}</div>
                <div><strong>Description:</strong> {this.state.cat.description}</div>
            </Card.Body>
        </Card>
        }


        return(
            <Container>
                {template}
            </Container>
        )
    }
}

export default withRouter(CatDetail);
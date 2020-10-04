import React, { Component } from 'react';
import axios from 'axios';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Select from '../select';
import CatItems from './cat_items';

class CatBrowser extends Component {
    state = {
        catSelectOptions: [],
        cats:[],
        breed:'',
        page: 1,
        showbutton: false
    };
   
    componentDidMount() {

        let that = this;
        axios.get('https://api.thecatapi.com/v1/breeds',{
            headers: {
                "x-api-key": "DEMO-API-KEY"
            }
        })
          .then(function (response) {
            let _cats = [];
            _cats = response.data.map(x => {
                let cat = {};
                cat.id = x.id;
                cat.name = x.name;

                return cat;
            })

            that.setState({catSelectOptions: _cats})
           
            if(that.props.location.search) {
                
                const _query = new URLSearchParams(that.props.location.search);
                
                var sel = document.getElementById('selectBreed');
                
                sel.value = _query.get('breed');

                that.setState({breed: _query.get('breed')});
                that.getCatsHandler();

            }

          })
          .catch(function (error) {
            console.log(error);
          })
    }

    getCatsHandler = (e) => {
        let that = this;
        let breed = e ? e.target.value : this.state.breed;

        if(e){
            if(this.state.breed !== e.target.value) {
                that.setState({cats: []});
            }
            that.setState({breed: breed});
            that.props.history.replace({pathname: '/', search: '?breed='+breed});
        }

        axios.get('https://api.thecatapi.com/v1/images/search', {
            params: {
                page: that.state.page,
                limit: 10,
                breed_id: breed
            }
        })
        .then(function (response) {
            let canshowbutton = false;
            let _cats = that.state.cats;

            response.data.map(x=> {
                if(_cats.findIndex(y => y.id === x.id) === -1) {
                    _cats = [..._cats, x];
                    canshowbutton = true;
                }
                return x;
            });
            
            if(canshowbutton){
                that.setState({showbutton: true})
            } else {
                that.setState({showbutton: false})
            }

          that.setState({cats: _cats})
          that.setState({page: that.state.page + 1})

        })
        .catch(function (error) {
          console.log(error);
        })
        
    }
    
    loadMoreHandler = () => {
        this.getCatsHandler();
    }

    render() {
        let catItems = <h4>No cats available</h4>;
        if (this.state.cats.length > 0) {
            catItems = <CatItems click={(event) => this.viewDetailHandler(event)} data={this.state.cats}/>
        }

        let showMore;
        if(this.state.showbutton){
            showMore = <div className="text-center">
                <Button disabled={this.state.cats.length === 0} onClick={this.loadMoreHandler} className="btn btn-success btn-sm">Load more</Button>
            </div>
        }

        return(
            <Container>
                <Card>
                    <Card.Body>
                        <h2>Find a cat breed</h2>
                        <Row>
                            <Col className="col-sm-4 offset-sm-4">
                                <Select changed={(event) => this.getCatsHandler(event)} data={this.state.catSelectOptions}/>
                            </Col>
                        </Row>
                        <hr/>
                        {catItems}
                        <hr/>
                        {showMore}
                    </Card.Body>
                </Card>
                
            </Container>
        )
    }   
}

export default CatBrowser;
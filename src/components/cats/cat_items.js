import React from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';


const CatItems = (props) => {
    
    return(
        <Row>
            {
                props.data.map(x=>{
                    return <Col key={x.id} className="col-md-3 col-sm-6 col-12">
                        <Card className="card-item">
                            <div className="image-holder">
                                <Card.Img src={x.url} />
                            </div>
                            <Card.Body>
                                <Link to={'/' + x.id} className="btn btn-primary btn-sm">View Details</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                })
            }
        </Row>
    )
}

export default withRouter(CatItems);
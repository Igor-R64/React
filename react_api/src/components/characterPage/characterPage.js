import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

export default class CharacterPage extends Component {

    state = {
        selectetChar: 130
    }




    onCharSelected = (id) => {
        this.setState({
            selectetChar: id
        })
    }

    render () {
        return (
            <Row>
            <Col md='6'>
                <ItemList onCharSelected={this.onCharSelected}/>
            </Col>
            <Col md='6'>
                <CharDetails charId={this.state.selectetChar} />
            </Col>
        </Row>
        )

    }
}
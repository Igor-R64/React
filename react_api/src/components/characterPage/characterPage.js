import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';

export default class CharacterPage extends Component {

    state = {
        selectetChar: 130,
        error: false
    }


    onCharSelected = (id) => {
        this.setState({
            selectetChar: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })

    }

    render () {

        if(this.state.error) {
            return <ErrorMessage/>
        }

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
import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand
} from 'reactstrap';

class NavBar extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Mini Project</NavbarBrand>
                </Navbar>
            </div>
        );
    }

}

export default NavBar;
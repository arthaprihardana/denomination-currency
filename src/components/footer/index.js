import React, { Component } from 'react';

export default class Footer extends Component {

    render() {
        let date = new Date();
        return (
            <div className="footer">
                <p className="text-muted">{date.getFullYear()} &copy; Copyright Artha Prihardana</p>
            </div>
        );
    }

}
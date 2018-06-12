import React from 'react';
var createReactClass = require('create-react-class');

let GraphText = createReactClass({
    render: function() {
        return (
            <g>
                <text textAnchor="middle" x={this.props.x} y={this.props.y} fontFamily="Arial" fontSize="10" stroke="none" strokeWidth="0" fill="#444444">{this.props.children}</text>
            </g>
        );
    }
});

export default GraphText;
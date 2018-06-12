import React from 'react';
var createReactClass = require('create-react-class');

let HorizontalLine = createReactClass({
    render: function() {

        // First point
        var d = 'M' + this.props.x1 + ',' + this.props.y;

        // Last point
        d += 'L' + this.props.x2 + ',' + this.props.y;

        return (
            <g>
                <path d={d} stroke={this.props.color} strokeWidth={this.props.width} fillOpacity="1" fill="none"></path>
            </g>
        );
    }
});

export default HorizontalLine;
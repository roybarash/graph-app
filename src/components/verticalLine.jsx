import React from 'react';
var createReactClass = require('create-react-class');

let VerticalLine = createReactClass({
    render: function() {
        var d = 'M' + this.props.x + ',' + this.props.y1;
            d += 'L' + this.props.x + ',' + this.props.y2;

        return (
            <g>
                <path d={d} className={this.props.class} stroke={this.props.color} strokeWidth={this.props.width} fillOpacity="1" fill="none"></path>
            </g>
        );
    }
});

export default VerticalLine;
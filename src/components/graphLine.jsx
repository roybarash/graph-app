import React from 'react';
var createReactClass = require('create-react-class');

let GraphLine = createReactClass({
    getInitialState: function() {
        return { selected: '' };
    },

    render: function() {
        // Points
        var points = this.props.points;

        var d = '';
        for(var i=0; i<points.length; i++) {
            d += 'L' + points[i].x + ',' + points[i].y;
        }

        // Change first char to 'M'
        if(d) {
            d = d.substr(1);
            d = 'M' + d;
        }

        return (
            <g>
                <path d={d} id={this.props.id} className="graph-line" stroke={this.props.color}
                      strokeWidth="{this.props.width}" fillOpacity="1" fill="none"
                      onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}></path>
            </g>
        );
    },

    mouseEnter: function() {
        //console.log('mouse enter');
        //this.setState({selected: 'selected'});
        document.getElementById(this.props.id).classList.add('selected');
    },

    mouseLeave: function() {
        //console.log('mouse leave');
        //this.setState({selected: ''});
        document.getElementById(this.props.id).classList.remove('selected');
    }
});

export default GraphLine;
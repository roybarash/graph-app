import React from 'react';
import GraphLine from './graphLine.jsx';
import HorizontalLine from './horizontalLine.jsx'
import VerticalLine from './verticalLine.jsx'
import GraphText from './graphText.jsx';
var createReactClass = require('create-react-class');


var created = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,5,3,2,3,3,3,3,5,7,3,3,3,3];
var active  = [3,2,2,3,2,2,1,1,2,2,1,2,2,1,1,1,1,5,4,2,2,2,2,3,2,4,2,2,2];
var billed  = [0,0,0,4,0,0,1,0,0,1,0,0,1,1,0,1,1,1,1,2,4,6,3,4,2,2,0,0,0];


let GraphComponent = createReactClass({
    getInitialState: function() {
        return {
            hoverX: -1,
            hoverY: -1,
            className: '',
            currentIndex: 0,
            currentGraph: '',
            hover: false
        };
    },

    render: function() {
        // Init
        this.graphHeight = 120;
        this.graphWidth = 520;
        this.graphPadding = 10;

        // Calculate graph zone
        this.graphZoneHeight = this.graphHeight - this.graphPadding * 2;
        this.graphZoneWidth  = this.graphWidth - this.graphPadding * 2;

        // Use length of first array
        this.itemsCount = created.length;

        // Find max
        this.max = this.getMaxFromAll(created, active, billed);

        var texts = [];

        // Background bars
        var backBars = [];
        var ys = this.getBars(this.max);

        for(var i=0; i<=5; i++) {
            var y = ys[i];

            backBars.push(
                (<HorizontalLine key={i} color="#ededed" width="1" y={this.translateY(y)} x1={this.graphPadding} x2={this.graphWidth - this.graphPadding}/>)
            );
            texts.push(
                (<GraphText key={i} x={this.graphWidth - this.graphPadding + 3} y={this.translateY(y) + 3}>{y}</GraphText>)
            );
        }

        // Popup css
        var popupCss = {
            top: this.state.hoverY,
            left: this.state.hoverX,
            display: this.state.hover ? 'block' : 'none'
        };

        var createdTdCss = {fontWeight: (this.state.currentGraph === 'created') ? 'bold' : 'normal'};
        var activeTdCss = {fontWeight: (this.state.currentGraph === 'active') ? 'bold' : 'normal'};
        var billedTdCss = {fontWeight: (this.state.currentGraph === 'billed') ? 'bold' : 'normal'};

        return (
            <div className="graph-component">
                <svg height={this.graphHeight} width={this.graphWidth} className={this.state.className} onMouseMove={this.onHover}>

                    {backBars}

                    {texts}

                    <VerticalLine class="dashed" color="#cbcbcb" width="2" x={this.state.hoverX} y1={this.graphPadding} y2={this.graphHeight - this.graphPadding}/>

                    <GraphLine id="created" color="#cc279d" width="3" points={this.valuesToPoints(created)}/>
                    <GraphLine id="active" color="#399a97" width="3" points={this.valuesToPoints(active)}/>
                    <GraphLine id="billed" color="#bfdbde" width="3" points={this.valuesToPoints(billed)}/>
                </svg>
                <div className="popup" style={popupCss}>
                    <span>{this.state.currentIndex}</span>
                    <table>
                        <tbody>
                            <tr className="created-line" style={createdTdCss}>
                                <td>Created</td>
                                <td>{created[this.state.currentIndex]}</td>
                            </tr>
                            <tr className="active-line" style={activeTdCss}>
                                <td>Active</td>
                                <td>{active[this.state.currentIndex]}</td>
                            </tr>
                            <tr className="billed-line" style={billedTdCss}>
                                <td>Bills Instance Estimate</td>
                                <td>{billed[this.state.currentIndex]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    },

    onHover: function(e) {
        var x = e.nativeEvent.offsetX - this.graphPadding;
        var y = e.nativeEvent.offsetY - this.graphPadding;

        // Check in bounds
        if((0 <= x && x <= this.graphZoneWidth) && (0 <= y && y <= this.graphZoneHeight)) {
            this.setState({
                hover: true,
                hoverX: e.nativeEvent.offsetX,
                hoverY: e.nativeEvent.offsetY
            });

            // check if any children is selected
            this.setState({
                className: '',
                currentGraph: ''
            });
            var children =  document.getElementsByClassName("graph-line");
            for(var i=0; i<children.length; i++) {
                if(children[i].classList.contains('selected')) {
                    this.setState({
                        className: 'graph-selected',
                        currentGraph: children[i].id
                    });
                }
            }

            // Get values
            var itemZone = this.graphZoneWidth / (this.itemsCount - 1);
            this.setState({currentIndex: Math.floor(x / itemZone)});
        }
        else{
            this.setState({hover: false});
        }
    },

    mouseLeave: function() {
        this.setState({hover: false});
    },

    translateY: function (y) {
        var percent = y /  this.max;
        percent = 1 - percent;                      // Y from top

        var newY = percent * this.graphZoneHeight;  // Translate percent to px
        newY += this.graphPadding;                  // Add padding from top

        return newY;

        //return (1 - y / this.max) * this.graphZoneHeight + graphPadding;
    },

    // Get max from 3 arrays
    getMaxFromAll: function(arr1, arr2, arr3) {
        // Merge all together
        var mergedArray = [];
        mergedArray.push(...arr1);
        mergedArray.push(...arr2);
        mergedArray.push(...arr3);

        //console.log(mergedArray);

        // Return max
        return this.getMax(mergedArray);
    },

    // Return max value in array
    getMax: function(data) {
        return data.reduce((max, p) => p > max ? p : max, data[0]);
    },

    // Translate array values to points
    valuesToPoints: function(values) {
        var points = [];

        var spaceBetweenPoints = this.graphZoneWidth / (values.length - 1);

        for(var i=0; i < values.length; i++) {
            var y = this.translateY(values[i]);
            var x = i * spaceBetweenPoints + this.graphPadding;

            var p = {};
            p.x = x;
            p.y = y;
            p.val = values[i];

            points.push(p);
        }

        return points;
    },

    // Background bars
    getBars: function (maxValue) {
        // We'll use 24 as example                          // 24

        var bars = [];

        // Get number length
        var len = Math.ceil(Math.log10(maxValue + 1));      // 2

        var highBar = Math.pow(10, len);                    // 100

        if(maxValue < highBar / 2)
            highBar = highBar / 2;                          // 50


        var fifth = highBar / 5;                            // 10

        bars.push(0);

        for(var i=1; i<=5; i++) {
            var b = fifth * i;
            bars.push(b);

            // Check if we've passed the value already
            var prev = b - fifth;
            if(prev >= maxValue)                            // Skip 50, we want to pass the limit by maximum of 2
                break;
            // Results: 0, 10, 20, 30, 40
        }

        this.max = bars[bars.length - 1];

        return bars;
    }
});

export default GraphComponent;
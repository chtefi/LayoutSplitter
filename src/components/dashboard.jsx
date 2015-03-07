var React = require('react');
var Cell = require('./cell.jsx');
var _ = require('lodash');
var color = require('color');

window.React = React;

function closest(from, selector) {
    while (from !== null) {
        // TODO: matches should be msMatchesSelector for IE
        if (from.matches(selector)) {
            return from;
        }
        from = from.parentElement;
    }
}

var Dashboard = React.createClass({
	getInitialState: function() {
		return {
			cell: { root: true, color: color('white').darken(.1).hexString(), backgroundImage: ''  }
		}
	},

	onDragOver: function(e) {
		e.preventDefault();
		var isFiles = (e.dataTransfer.types.indexOf("Files") >= 0);
		if (isFiles) {
            e.dataTransfer.dropEffect = 'copy';
            e.dataTransfer.effectAllowed = 'copy';
        }
	},

	render: function() {
		var styles = {
			height: '100%',
			width: '100%',
			padding: 10,
			border: '1px solid #ccc',
			display: 'flex',
			backgroundColor: 'white'
		};
		return 	<div className="dashboard" style={styles} onDragOver={ this.onDragOver }>
					<Cell { ...this.state.cell } />
				</div>;
	}
});

module.exports = Dashboard;
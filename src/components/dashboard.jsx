var React = require('react');
var Widget = require('./widget.jsx');
var _ = require('lodash');
var color = require('color');

function closest(from, selector) {
    while (from !== null) {
        // todo: matches should be msMatchesSelector for IE
        if (from.matches(selector)) {
            return from;
        }
        from = from.parentElement;
    }
}

var Dashboard = React.createClass({
	getInitialState: function() {
		return {
			widget: { root: true, color: color('white').darken(.1).hexString(), backgroundImage: ''  }
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
			height: 600,
			width: 1000,
			padding: 10,
			border: '1px solid #ccc',
			display: 'flex',
			backgroundColor: 'white'
		};
		return 	<div className="dashboard" style={styles} onDragOver={ this.onDragOver }>
					<Widget { ...this.state.widget } />
				</div>;
	}
});

module.exports = Dashboard;
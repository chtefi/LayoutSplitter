var React = require('react');
var Widget = require('./widget.jsx');
var _ = require('lodash');

var Dashboard = React.createClass({
	getInitialState: function() {
		return {
			widget: { color: 'red' }
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
		return <div className="dashboard" style={styles}>
				<Widget { ...this.state.widget } />
		</div>;
	}
});

module.exports = Dashboard;
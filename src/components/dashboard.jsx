var React = require('react');
var Widget = require('./widget.jsx');
var _ = require('lodash');

var Dashboard = React.createClass({
	getInitialState: function() {
		return {
			widgets: [
				{
					type: 'text',
					props: {
						text: 'blabla'
					}
				},
				{
					type: 'text',
					props: {
						text: 'fubar'
					}
				}
			]
		}
	},

	render: function() {
		var styles = {
			width: 400,
			height: 400,
			border: '1px solid #ccc'
		};
		return <div className="dashboard" style={styles}>
			{ _.map(this.state.widgets, function(w) {
				return <Widget {...w} />;
			}) }
		</div>;
	}
});

module.exports = Dashboard;
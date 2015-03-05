var React = require('react');
var Dashboard = require('./dashboard.jsx');

var App = React.createClass({
	render: function() {
		return <Dashboard />;
	}
});

React.render(<App />, document.body);
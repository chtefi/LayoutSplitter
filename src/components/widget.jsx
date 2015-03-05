var React = require('react');
var _ = require('lodash');

var Widget = React.createClass({
	getInitialState: function() {
		return {};
	},

	render: function() {
		return <div className="widget">
			{ this.props.type }
		</div>;
	}
});

module.exports = Widget;
var React = require('react');
var _ = require('lodash');
var color = require('color');

var previousDirection;

var Widget = React.createClass({
	getInitialState: function() {
		return {
			standalone: true
		};
	},

	split: function() {
		var subcolor = color(this.props.color).darken(.1).hexString();

		this.setState({
			standalone: false,
			direction: (previousDirection != 'column' ? 'column': 'row'),
			w1: { color: subcolor },
			w2: { color: subcolor }
		});
		previousDirection = (previousDirection != 'column' ? 'column' : 'row');
	},

	unsplit: function(e) {
		e.preventDefault();
		this.setState({
			standalone: true
		});
	},

	render: function() {
		if (this.state.standalone) {
			var styles = { 
				backgroundColor: this.props.color,
				flex: 1
			};

			return	<div className="widget" style={ styles } onClick={ this.split } onContextMenu={ this.props.onUnsplit }>
					</div>;
		} else {
			var styles = { 
				flex: 1,
				display: 'flex',
				flexDirection: this.state.direction
			};

			var separatorStyles = this.state.direction == 'row' ? { width: 10 } : { height: 10 };

			return	<div className="widget widget--container" style={ styles }>
						<Widget {...this.state.w1 } onUnsplit={ this.unsplit } />
						<div style={ separatorStyles }></div>
						<Widget {...this.state.w2 }  onUnsplit={ this.unsplit } />
					</div>;
		}
	}
});

module.exports = Widget;
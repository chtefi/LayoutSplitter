var React = require('react');
var _ = require('lodash');
var color = require('color');

var Widget = React.createClass({
	getInitialState: function() {
		return {
			standalone: true
		};
	},

	onMouseDown: function(e) {
		e.preventDefault();
		e.stopPropagation();

		var left = e.target.offsetLeft;
		var top = e.target.offsetTop;
		var width = e.target.offsetWidth;
		var height = e.target.offsetHeight;

		var mouseLeft = e.pageX;
		var mouseTop = e.pageY;

		var relativeLeft = (mouseLeft - left) / width;
		var relativeTop = (mouseTop - top) / height;

		var isTopRight = (relativeLeft > relativeTop);
		var isBottomLeft = !isTopRight;
		var isTopLeft = (1.0 - relativeLeft > relativeTop);
		var isBottomRight = !isTopLeft;

		if (isTopRight && isTopLeft) {
			direction = 'top';
		} else if (isBottomRight && isBottomLeft) {
			direction = 'bottom';
		} else if (isTopRight && isBottomRight) {
			direction = 'right';
		} else {
			direction = 'left';
		}

		switch (e.button) {
			case 0: this.split(direction); break;
			case 2: this.props.onUnsplit(); break;
		}		
	},

	split: function() {
		var subcolor = color(this.props.color).darken(.1).hexString();

		this.setState({
			standalone: false,
			direction: (direction === 'top' || direction === 'bottom' ? 'column': 'row'),
			w1: { color: subcolor },
			w2: { color: subcolor }
		});
	},

	unsplit: function() {
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

			return	<div className="widget widget--standalone" style={ styles } onMouseDown={ this.onMouseDown } onContextMenu={ function(e) { e.preventDefault(); e.stopPropagation(); } }>
					</div>;
		} else {
			var styles = { 
				flex: 1,
				display: 'flex',
				flexDirection: this.state.direction
			};

			var separatorStyles = this.state.direction == 'row' ? { width: 5 } : { height: 5 };

			return	<div className="widget widget--container" style={ styles }>
						<Widget {...this.state.w1 } onUnsplit={ this.unsplit } />
						<div style={ separatorStyles }></div>
						<Widget {...this.state.w2 }  onUnsplit={ this.unsplit } />
					</div>;
		}
	}
});

module.exports = Widget;
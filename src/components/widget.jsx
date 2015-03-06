var React = require('react');
var _ = require('lodash');
var color = require('color');

var Widget = React.createClass({
	getInitialState: function() {
		return {
			standalone: true,
			hoveringDirection: null,
			backgroundImage: this.props.backgroundImage
		};
	},

	onMouseDown: function(e) {
		e.preventDefault();
		e.stopPropagation();

		switch (e.button) {
			case 0: // left click to split
				var direction = this._getDirection(e);
				this.split(direction);
				break;
			case 2: // right click to clear / unsplit
				if (this.state.backgroundImage) {
					this.setState({ backgroundImage: '' });
				} else if (!this.props.root) { // don't unsplit the root widget
					this.props.onUnsplit();
				}
				break;
		}		
	},

	onMouseMove: function(e) {
		var direction = this._getDirection(e);
		this.setState({ hoveringDirection: direction });
	},

	_getDirection: function(e) {
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
			return 'top';
		}
		
		if (isBottomRight && isBottomLeft) {
			return 'bottom';
		}
		
		if (isTopRight && isBottomRight) {
			return 'right';
		}

		return 'left';
	},

	onDrop: function(e) {
		// preventDefault to cancel the default behavior
        // for instance, if the text is a URL, the browser has some default action
        e.preventDefault();

		var self = this;
		var itemWhereDrop = e.target;

        var isFiles = (e.dataTransfer.types.indexOf("Files") >= 0);
        if (isFiles) {
        	for (var i = 0; i < e.dataTransfer.files.length; i++) {
        		var reader = new FileReader();
        		reader.onload = (function(theFile) {
        			return function(e) {
    					var data = e.target.result; // "data:image/png;base64,iVBORw0KGgoAAAANS..."
						self.setState({ backgroundImage: 'url(' + data + ')' });
        			};
        		}(e.dataTransfer.files[i]));
        		reader.onerror = (function(theFile) {
        			return function(e) {
    					alert("couldn't get data from this file " + theFile.name);
        			};
        		}(e.dataTransfer.files[i]));
        		reader.readAsDataURL(e.dataTransfer.files[i]);
            }
        }
	},

	split: function(direction) {
		var subcolor = color(this.props.color).darken(.1).hexString();

		this.setState({
			standalone: false,
			direction: (direction === 'top' || direction === 'bottom' ? 'column': 'row'),
			w1: { color: subcolor, backgroundImage: this.state.backgroundImage },
			w2: { color: subcolor },
			backgroundImage: null // clear the container backgroundImage
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
				backgroundImage: this.state.backgroundImage,
				flex: 1
			};

			return	<div 	className={ "widget widget--standalone" + (this.state.hoveringDirection ? ' widget--standalone--hovered--' + this.state.hoveringDirection : '') }
							style={ styles }
							onMouseDown={ this.onMouseDown }
							onMouseMove={ this.onMouseMove }
							onContextMenu={ function(e) { e.preventDefault(); e.stopPropagation(); } }
							onDrop={ this.onDrop } 
					>
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
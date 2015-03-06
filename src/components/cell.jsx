var React = require('react');
var _ = require('lodash');
var color = require('color');

function getDirection(e) {
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
};


var Cell = React.createClass({
	getInitialState: function() {
		return {
			standalone: true, // are you a cell container or a cell only
			hoveringDirection: null, // set when the mouse hovers the cell
			backgroundImage: this.props.backgroundImage // empty for cell container, set for cell, passed by the parent
		};
	},

	onMouseDown: function(e) {
		e.preventDefault();
		e.stopPropagation();

		switch (e.button) {

			// left click to split
			case 0: 
				var direction = getDirection(e);
				this.split(direction);
				break;

			// right click to clear / unsplit
			case 2: 
				if (this.state.backgroundImage) {
					this.setState({ backgroundImage: '' });
				} else if (!this.props.root) { // don't unsplit the root cell
					this.props.onUnsplit();
				}
				break;
		}		
	},

	onMouseMove: function(e) {
		var direction = getDirection(e);
		this.setState({ hoveringDirection: direction });
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

	// called only on a cell (standalone=true)
	split: function(direction) {
		// our cell is mutated to a cell container, tada!
		this.setState({
			standalone: false,
			direction: (direction === 'top' || direction === 'bottom' ? 'column': 'row')
		});
	},


	// called only on a cell container (standalone=false)
	unsplit: function() {
		this.setState({
			standalone: true,
			backgroundImage: this.refs.cell1.state.backgroundImage || this.refs.cell2.state.backgroundImage
		});
	},

	render: function() {

		// the cell is a unique cell, not a container
		if (this.state.standalone) {

			var styles = { 
				backgroundColor: this.props.color,
				backgroundImage: this.state.backgroundImage,
				flex: 1
			};

			return	<div 	className={ "cell cell--standalone" + (this.state.hoveringDirection ? ' cell--standalone--hovered--' + this.state.hoveringDirection : '') }
							style={ styles }
							onMouseDown={ this.onMouseDown }
							onMouseMove={ this.onMouseMove }
							onContextMenu={ function(e) { e.preventDefault(); e.stopPropagation(); } }
							onDrop={ this.onDrop } 
					>
					</div>;
		}

		// the cell is a container of 2 cells (+ a separator)
		var styles = { 
			flex: 1,
			display: 'flex',
			flexDirection: this.state.direction
		};

		var separatorStyles = this.state.direction == 'row' ? { width: 5 } : { height: 5 };
		
		// each depth is darker than the previous one
		var subcolor = color(this.props.color).darken(.1).hexString();
		
		return	<div className="cell cell--container" style={ styles }>
					<Cell ref="cell1" color={subcolor} backgroundImage={ this.state.backgroundImage } onUnsplit={ this.unsplit } />
					<div style={ separatorStyles }></div>
					<Cell ref="cell2" color={subcolor} backgroundImage={ this.state.backgroundImage } onUnsplit={ this.unsplit } />
				</div>;
	}
});

module.exports = Cell;
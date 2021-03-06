/* global require */

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var uglify = require('uglifyify');
var less = require('gulp-less');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

var PATHS = {
    app: './src/components/app.jsx',
    components: './src/components/**/*.jsx',
    less: ['./src/styles/**/*.css', './src/styles/**/*.less'],
    build: './build/client/',
    html: './src/index.html'
}
var JS_BUNDLE_NAME = 'bundle.js';
var CSS_BUNDLE_NAME = 'bundle.css';

gulp.task('js', function() {
    browserify(PATHS.app)
        .transform(reactify)
        .bundle()
        .pipe(uglify(null, { sourcemap: false }))
        .on('error', function(err) { console.error('js', err); })
        .pipe(source(JS_BUNDLE_NAME))        
        .pipe(gulp.dest(PATHS.build))
        .pipe(livereload());
});

gulp.task('html', function() {
    gulp.src(PATHS.html)
        .pipe(gulp.dest(PATHS.build))
        .pipe(livereload());
});

gulp.task('less', function() {
    gulp.src(PATHS.less)
        .on('error', function(err) { console.error('less', err); })
        .pipe(less())        
        .pipe(concat(CSS_BUNDLE_NAME))
        .pipe(gulp.dest(PATHS.build))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch([PATHS.components], ['js']);
    gulp.watch([PATHS.less], ['less']);
    gulp.watch([PATHS.html], ['html']);
});

gulp.task('default', ['js', 'less', 'html'], function() {

});





















// var DRAG_THRESHOLD, Draggable, DropTarget, DropTargets, Example, LEFT_BUTTON, SourceObject, SourceObjects, div, p, _ref,
//   __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

// _ref = React.DOM, div = _ref.div, p = _ref.p;

// LEFT_BUTTON = 0;

// DRAG_THRESHOLD = 3;

// document.addEventListener('DOMContentLoaded', function() {
//   return React.renderComponent(Example(), document.body);
// });



// Example = React.createClass({
//   getInitialState: function() {
//     return {
//       currentDragItem: null
//     };
//   },
//   render: function() {
//     return div({
//       className: "dnd-example " + (this.state.currentDragItem ? 'dragging' : void 0),
//       children: [
//         SourceObjects({
//           onDragStart: this.onDragStart,
//           onDragStop: this.onDragStop
//         }), DropTargets({
//           currentDragItem: this.state.currentDragItem,
//           onDrop: this.onDrop
//         }), this.dropDescription()
//       ]
//     });
//   },
//   onDragStart: function(details) {
//     return this.setState({
//       currentDragItem: details
//     });
//   },
//   onDragStop: function() {
//     return this.setState({
//       currentDragItem: null
//     });
//   },
//   onDrop: function(target) {
//     return this.setState({
//       lastDrop: {
//         source: this.state.currentDragItem,
//         target: target
//       }
//     });
//   },
//   dropDescription: function() {
//     var drop;
//     if (drop = this.state.lastDrop) {
//       return p({
//         className: 'drop-description',
//         children: "Dropped source " + drop.source.type + "-" + drop.source.index + " on target " + drop.target.index
//       });
//     }
//   }
// });



// SourceObjects = React.createClass({
//   render: function() {
//     var i, object;
//     return div({
//       className: 'dnd-source-objects',
//       children: (function() {
//         var _i, _len, _ref1, _results;
//         _ref1 = this.objects();
//         _results = [];
//         for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
//           object = _ref1[i];
//           _results.push(SourceObject({
//             type: object.type,
//             index: i + 1,
//             children: i + 1,
//             onDragStart: this.props.onDragStart,
//             onDragStop: this.props.onDragStop
//           }));
//         }
//         return _results;
//       }).call(this)
//     });
//   },
//   objects: function() {
//     var i;
//     return _.flatten([
//       (function() {
//         var _i, _results;
//         _results = [];
//         for (i = _i = 0; _i <= 2; i = ++_i) {
//           _results.push({
//             type: 'green'
//           });
//         }
//         return _results;
//       })(), (function() {
//         var _i, _results;
//         _results = [];
//         for (i = _i = 0; _i <= 2; i = ++_i) {
//           _results.push({
//             type: 'blue'
//           });
//         }
//         return _results;
//       })()
//     ]);
//   }
// });

// SourceObject = React.createClass({
//   render: function() {
//     return Draggable({
//       className: "dnd-source-object " + this.props.type,
//       children: this.props.children,
//       onDragStart: this.props.onDragStart,
//       onDragStop: this.props.onDragStop,
//       dragData: this.dragData
//     });
//   },
//   dragData: function() {
//     return {
//       type: this.props.type,
//       index: this.props.index
//     };
//   }
// });



// Draggable = React.createClass({
//   getInitialState: function() {
//     return {
//       mouseDown: false,
//       dragging: false
//     };
//   },
//   render: function() {
//     return this.transferPropsTo(div({
//       style: this.style(),
//       className: "dnd-draggable " + (this.state.dragging ? 'dragging' : void 0),
//       children: this.props.children,
//       onMouseDown: this.onMouseDown
//     }));
//   },
//   style: function() {
//     if (this.state.dragging) {
//       return {
//         position: 'absolute',
//         left: this.state.left,
//         top: this.state.top
//       };
//     } else {
//       return {};
//     }
//   },
//   onMouseDown: function(event) {
//     var pageOffset;
//     if (event.button === LEFT_BUTTON) {
//       event.stopPropagation();
//       this.addEvents();
//       pageOffset = this.getDOMNode().getBoundingClientRect();
//       return this.setState({
//         mouseDown: true,
//         originX: event.pageX,
//         originY: event.pageY,
//         elementX: pageOffset.left,
//         elementY: pageOffset.top
//       });
//     }
//   },
//   onMouseMove: function(event) {
//     var deltaX, deltaY, distance, _base, _base1;
//     deltaX = event.pageX - this.state.originX;
//     deltaY = event.pageY - this.state.originY;
//     distance = Math.abs(deltaX) + Math.abs(deltaY);
//     if (!this.state.dragging && distance > DRAG_THRESHOLD) {
//       this.setState({
//         dragging: true
//       });
//       if (typeof (_base = this.props).onDragStart === "function") {
//         _base.onDragStart(typeof (_base1 = this.props).dragData === "function" ? _base1.dragData() : void 0);
//       }
//     }
//     if (this.state.dragging) {
//       return this.setState({
//         left: this.state.elementX + deltaX + document.body.scrollLeft,
//         top: this.state.elementY + deltaY + document.body.scrollTop
//       });
//     }
//   },
//   onMouseUp: function() {
//     this.removeEvents();
//     if (this.state.dragging) {
//       this.props.onDragStop();
//       return this.setState({
//         dragging: false
//       });
//     }
//   },
//   addEvents: function() {
//     document.addEventListener('mousemove', this.onMouseMove);
//     return document.addEventListener('mouseup', this.onMouseUp);
//   },
//   removeEvents: function() {
//     document.removeEventListener('mousemove', this.onMouseMove);
//     return document.removeEventListener('mouseup', this.onMouseUp);
//   }
// });



// DropTargets = React.createClass({
//   render: function() {
//     var i, target;
//     return div({
//       className: 'dnd-drop-targets',
//       children: (function() {
//         var _i, _len, _ref1, _results;
//         _ref1 = this.targets();
//         _results = [];
//         for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
//           target = _ref1[i];
//           _results.push(DropTarget({
//             target: target,
//             index: i,
//             currentDragItem: this.props.currentDragItem,
//             onDrop: this.props.onDrop
//           }));
//         }
//         return _results;
//       }).call(this)
//     });
//   },
//   targets: function() {
//     return [
//       {
//         accepts: ['blue']
//       }, {
//         accepts: ['green']
//       }, {
//         accepts: ['blue', 'green']
//       }, {
//         accepts: []
//       }
//     ];
//   }
// });



// DropTarget = React.createClass({
//   getInitialState: function() {
//     return {
//       hover: false
//     };
//   },
//   render: function() {
//     return div({
//       className: this.classes(),
//       children: 'accepts ' + this.acceptsDescription(),
//       onMouseEnter: (function(_this) {
//         return function() {
//           return _this.setState({
//             hover: true
//           });
//         };
//       })(this),
//       onMouseLeave: (function(_this) {
//         return function() {
//           return _this.setState({
//             hover: false
//           });
//         };
//       })(this),
//       onMouseUp: this.onDrop
//     });
//   },
//   classes: function() {
//     return ['dnd-drop-target', "" + (this.props.target.accepts.join(' ')), this.active() ? 'active' : void 0, this.active() && this.props.currentDragItem.type === 'green' ? 'active-green' : void 0, this.active() && this.props.currentDragItem.type === 'blue' ? 'active-blue' : void 0, this.disabled() ? 'disabled' : void 0, this.state.hover ? 'hover' : void 0].join(' ');
//   },
//   active: function() {
//     var item, _ref1;
//     item = this.props.currentDragItem;
//     return item && (_ref1 = item.type, __indexOf.call(this.props.target.accepts, _ref1) >= 0);
//   },
//   disabled: function() {
//     var item, _ref1;
//     item = this.props.currentDragItem;
//     return item && (_ref1 = item.type, __indexOf.call(this.props.target.accepts, _ref1) < 0);
//   },
//   acceptsDescription: function() {
//     if (this.props.target.accepts.length > 0) {
//       return this.props.target.accepts.join(' & ');
//     } else {
//       return 'nothing';
//     }
//   },
//   onDrop: function() {
//     var _base;
//     if (this.active()) {
//       return typeof (_base = this.props).onDrop === "function" ? _base.onDrop({
//         index: this.props.index + 1
//       }) : void 0;
//     }
//   }
// });

// // ---
// // generated by coffee-script 1.9.0

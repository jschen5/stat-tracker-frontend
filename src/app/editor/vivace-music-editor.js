(function ($) {

  $.fn.vivaceMusicEditor = function (options) {

    var $self = $(this);

    var settings = $.extend({
      //add default settings here
    }, options);


    ///* OBJECT DEFINITIONS *///
    var Point = function (x, y) {
      this.x = x; this.y = y;
    };

    /// Begin Line Definition ///
    var Line = function(p1, p2, stage, options) {
      /// <params> p1 = start point object </params>
      /// <params> p2 = end point object </params>
      /// <params> stage = easel stage object with canvas </params>
      /// <params> options = different properties for line </params>

      // call parent constructor
      createjs.Shape.call(this);

      // initialize Line specific properties
      this._start = p1;
      this._end = p2;
      this._stage = stage;
      this.options = this.options || {};
      this._color = options._color || '#000';
      this._thickness = options.thickness || 1;

      this.graphics.moveTo(this._start.x, this._start.y)
          .setStrokeStyle(this._thickness).beginStroke(this._color).lineTo(this._end.x, this._end.y);
    };
    Line.prototype = Object.create(creatjs.Shape.prototype);
    Line.prototype.constructor = Line;
    Line.prototype.draw = function () {
      this._stage.addChild(this);
    };
    Line.prototype.setColor = function(color) { this._color = color; };
    Line.prototype.setThickness = function(thickness) { this._thickness = thickness; };
    /// End Line Definition

    /// Begin Staff Definition
    var Staff = function(startPoint, stage) {
      /// <params> startPoint = top left corner point of staff </params>

      // call parent constructor
      createjs.Shape.call(this);

      // initialize Staff specific properties
      this._components = [];
      this._start = startPoint;
      this._stage = stage;

      var p1 = startPoint;
      var p2 = new Point(stage.canvas.width, startPoint.y);
      for (var i = 0; i < 5; i++) {
        var line = new Line(p1, p2, this._stage);
      }
    };
    /// End Staff Definition

    ///* END OBJECT DEFINITIONS *///

    var stage = new createjs.Stage(this.attr('id'));
    stage.canvas.width = $self.width();

    /* TrebleClef  */
    var TrebleClef = function (color, topLine, bottomLine, stage) {
      this._components = [];
      var circle = new createjs.Shape();
      circle.graphics.setStrokeStyle(1).beginStroke(color)
          .drawCircle(bottomLine.x + 30, bottomLine.y + 30, 10);
      this._components.push(circle);

      this.draw = function() {
        for (var i = 0; i < this._components.length; i++) {
          stage.addChild(this._components[i]);
        }
      };
    };

    var Staff = function (startPoint) {
      this._lines = [];
      var p1 = startPoint;
      var p2 = new Point(stage.canvas.width, 5);

      var ld = new LineDrawer(p1, p2, stage, {
        color: '#000',
        thickness: 1
      });

      for (var i = 0; i < 5; i++) {
        this._lines.push(ld.draw());
        ld.incrementStart({ y:20 });
        ld.incrementEnd({ y:20 });
      }

    };

    var Page = function () {

    };

    var staff = new Staff(new Point(0, 5));
    var bottomLine = staff._lines[staff._lines.length - 1];
    var trebleClef = new TrebleClef('#000', bottomLine, 0, stage);
    trebleClef.draw();

    stage.update();

    return this;

  };

}(jQuery));
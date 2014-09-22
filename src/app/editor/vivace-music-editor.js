(function ($) {

  $.fn.vivaceMusicEditor = function (options) {

    var $self = $(this);

    var settings = $.extend({
      //add default settings here
    }, options);

    var Point = function (x, y) {
      this.x = x; this.y = y;
    };

    var stage = new createjs.Stage(this.attr('id'));
    stage.canvas.width = $self.width();

    ///* BEGIN DRAWER DEFINITIONS *///

    /* LineDrawer: Returns an object used to specify and draw lines */
    var LineDrawer = function (p1, p2, stage, options) {
      /// <params> p1 = start point object </params>
      /// <params> p2 = end point object </params>
      /// <params> stage = easel stage object with canvas </params>
      /// <params> options = different properties for line
      this._start = p1;
      this._end = p2;
      this.options = options || {};
      this._color = this.options.color || '#000';
      this._thickness = this.options.thickness || 1;

      this._line = new createjs.Shape();
      this._line.graphics.setStrokeStyle(this._thickness);

      // caller must manually call endDraw() to finish drawing
      this._line.graphics.beginStroke(this._color);

      this.draw = function() {
        this._line.graphics.moveTo(this._start.x, this._start.y).lineTo(this._end.x, this._end.y);
      };

      // ends stroke and returns createjs.Shape obj to be added to stage
      this.endDraw = function() {
        this._line.graphics.endStroke();
        return this._line;
      };

      this.setStart = function(p) {
        this._start.x = p.x || this._start.x;
        this._start.y = p.y || this._start.y;
      };

      this.setEnd = function(p) {
        this._end.x = p.x || this._end.x;
        this._end.y = p.y || this._end.y;
      };

      this.incrementStart = function(delta) {
        var dx = delta.x || 0;
        var dy = delta.y || 0;
        this._start.x += dx;
        this._start.y += dy;
      };

      this.incrementEnd = function(delta) {
        var dx = delta.x || 0;
        var dy = delta.y || 0;
        this._end.x += dx;
        this._end.y += dy;
      };

      this.setColor = function(color) {
        this._color = color;
        this._line.graphics.beginStroke(color);
      };

      this.setThickness = function(thickness) {
        this._thickness = thickness;
        this._line.graphics.setStrokeStyle(thickness);
      };
    };
    /* End LineDrawer Definition */

    /* TrebleClef: Returns an obj used to spec and draw treble clef  */
    var TrebleClefDrawer = function (color, topStartPt, bottomStartPt) {
      this._color = color;
      this._top = topStartPt;
      this._bottom = bottomStartPt;
      this._img = new Image();
      this._img.src = 'assets/treble.png';

      this.draw = function () {
        var ready = $.Deferred();
        this._img.onload = $.proxy(function (e) {
          this._trebleClef = new createjs.Bitmap(e.target);
          this._trebleClef.x = -10;
          this._trebleClef.y = -22;
          this._trebleClef.scaleX = 0.09;
          this._trebleClef.scaleY = 0.09;
          ready.resolve();
        }, this);
        return ready.promise();
      };

      this.endDraw = function () {
        return this._trebleClef;
      };
    };

    /* StaffDrawer: Returns an object used to spec and draw staff */
    var StaffDrawer = function (startPoint, stage) {
      this._start = startPoint;
      this._stage = stage;

      // p1, p2 will be updated per line of staff
      this.p1 = new Point(this._start.x, this._start.y);
      this.p2 = new Point(this._stage.canvas.width, this._start.y);

      this.draw = function () {
        var lineDrawer = new LineDrawer(this.p1, this.p2, this._stage, {
          color: '#000',
          thickness: 1
        });
        for (var i = 0; i < 5; i++) {
          if (i !== 0) {
            lineDrawer.incrementStart({ y: 20 });
            lineDrawer.incrementEnd({ y: 20 });            
          }
          lineDrawer.draw();
        }

        this._stage.addChild(lineDrawer.endDraw());

        var trebleClefDrawer = new TrebleClefDrawer('#000', this._start, this.p1);
        trebleClefDrawer.draw().done(function () {
          var treble = trebleClefDrawer.endDraw();
          stage.addChild(treble);
          stage.update();
        });
      };
    };
    /* End StaffDrawer Definition */

    ///* END DRAWER DEFINITIONS *///

    var topLeft = new Point(0, 15);
    var staffDrawer = new StaffDrawer(topLeft, stage);
    staffDrawer.draw();

    stage.update();

    return this;

  };

}(jQuery));
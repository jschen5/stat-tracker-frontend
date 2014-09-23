(function ($) {

  $.fn.vivaceMusicEditor = function (options) {

    var $self = $(this);

    var settings = $.extend({
      //add default settings here
    }, options);

    var Point = function (x, y) {
      this.x = x; this.y = y;

      this.clone = function() {
        return new Point(this.x, this.y);
      };
    };

    var stage = new createjs.Stage(this.attr('id'));
    stage.canvas.width = $self.width();

    ///* BEGIN OBJ DEFINITIONS *///

    var Line = function (p1, p2, stage, options) {
      this.start = p1;
      this.end = p2;
      this.stage = stage;
      this.options = options || {};
      this.color = this.options.color || '#000';
      this.thickness = this.options.thickness || 1;

      this.shape = new createjs.Shape();

      this.draw = function () {
        this.shape.graphics.setStrokeStyle(this.thickness).beginStroke(this.color);
        this.shape.graphics.moveTo(this.start.x, this.start.y).lineTo(this.end.x, this.end.y);
        this.shape.graphics.endStroke();
        this.stage.addChild(this.shape);
      };
    };

    var VivaceImage = function (pos, scale, color, src, stage) {
      this.position = pos;
      this.scale = scale;
      this.color = color;
      this.src = src;
      this.stage = stage;
      this._deferred = $.Deferred();
      this.imgReady = this._deferred.promise();

      this.init = function () {
        var img = new Image();
        img.src = this.src;
        img.onload = $.proxy(function (e) {
          this.image = new createjs.Bitmap(e.target);
          this.image.x = this.position.x;
          this.image.y = this.position.y;
          this.image.scaleX = this.scale.x;
          this.image.scaleY = this.scale.y;
          this._deferred.resolve();
        }, this);
      };
      this.init();

      this.draw = function () {
        this.imgReady.done($.proxy(function() {
          this.stage.addChild(this.image);
        }, this));
        return this.imgReady;
      };
    };

    var Staff = function (topLeft, width, space, stage) {
      this.topLeft = topLeft;
      this.width = width;
      this.space = space;
      this.stage = stage;
      this.components = [];

      this.init = function () {
        for (var i = 0; i < 5; i++) {
          var p1 = new Point(topLeft.x, topLeft.y + i * this.space);
          var p2 = new Point(p1.x + width, topLeft.y + i * this.space);
          this.components.push(new Line(p1, p2, this.stage));
        }
        var trebleClefPos = new Point(this.topLeft.x - 10, this.topLeft.y - 37);
        var trebleClefScl = { x: 0.09, y: 0.09 };
        var trebleClef = new VivaceImage(trebleClefPos, trebleClefScl,
                                         '#000', 'assets/treble.png', this.stage);
        this.components.push(trebleClef);
      };
      this.init();

      this.draw = function () {
        var imagesReady = [];
        for (var i = 0; i < this.components.length; i++) {
          var comp = this.components[i];
          if (comp instanceof VivaceImage) {
            imagesReady.push(comp.draw());
          } else {
            comp.draw();
          }
        }
        $.when.apply($, imagesReady).done($.proxy(function () {
          this.stage.update();
        }, this));
      };
    };
    ///* END OBJ DEFINITIONS *///

    var topLeft = new Point(0, 15);
    var staff = new Staff(topLeft, stage.canvas.width, 20, stage);
    staff.draw();

    return this;

  };

}(jQuery));
var WidgetManager = (function () {
    function WidgetManager(node) {
        var _this = this;
        this.moving = undefined;
        this.widgets = new Array();
        this.node = node;
        this.node.onmousemove = function (e) {
            _this.onDragOver(e);
        };
        this.node.onmouseup = function () {
            _this.onDragStop();
        };
    }
    WidgetManager.prototype.exists = function (clas) {
        for (var i = 0; i != this.widgets.length; i++) {
            if (this.widgets[i] instanceof clas)
                return true;
        }
        return false;
    };
    WidgetManager.prototype.onDragStop = function () {
        if (this.moving != undefined) {
            this.organize(this.moving);
            this.moving.div.style.transitionProperty = "all";
            this.moving.div.style.zIndex = "0";
        }
        this.moving = undefined;
    };
    WidgetManager.prototype.getFreeZone = function (w, h) {
        var object = { x: null, y: null };
        for (var i = 0; i != this.node.clientWidth - w; i++) {
            for (var u = 0; u != this.node.clientHeight - h; u++) {
                for (var p = 0; p != this.widgets.length; p++) {
                    if (this.widgets[i].intersects(i, u, w, h) == false) {
                        object.x = i;
                        object.y = u;
                        break;
                    }
                }
                if (object.x != null)
                    break;
            }
            if (object.x != null)
                break;
        }
        if (object.x != null)
            return object;
        return null;
    };
    WidgetManager.prototype.onDragOver = function (e) {
        if (this.moving == undefined) {
            return;
        }
        this.moving.div.style.transitionProperty = "none";
        this.moving.div.style.zIndex = "100";
        this.moving.move(e.pageX - this.moving.width / 2, e.pageY - this.moving.height / 2);
    };
    WidgetManager.prototype.setMoving = function (moving) {
        if (moving.fixed == false)
            this.moving = moving;
    };
    WidgetManager.prototype.registerWidget = function (widget) {
        for (var i = 0; i != this.widgets.length; i++) {
            if (this.widgets[i] == widget)
                return false;
        }
        widget.setParent(this.node);
        this.widgets.push(widget);
        this.organize(widget);
        return true;
    };
    WidgetManager.prototype.organize = function (widget) {
        var moved = false;
        for (var i = 0; i != this.widgets.length; i++) {
            var other = this.widgets[i];
            if (other == widget)
                continue;
            if (other.onCollid(widget)) {
                moved = true;
                var x = other.getCenter()["x"] - widget.getCenter()["x"];
                var y = other.getCenter()["y"] - widget.getCenter()["y"];
                if (Math.abs(x) > Math.abs(y)) {
                    console.log("x");
                    if (x > 0) {
                        widget.move(other.getPosition()["x"] - widget.getSize()["w"] - 5, widget.getPosition()["y"]);
                    }
                    else {
                        widget.move(other.getPosition()["x"] + other.getSize()["w"] + 5, widget.getPosition()["y"]);
                    }
                }
                else {
                    console.log("y");
                    if (y > 0) {
                        widget.move(widget.getPosition()["x"], other.getPosition()["y"] - widget.getSize()["h"] - 5);
                    }
                    else {
                        widget.move(widget.getPosition()["x"], other.getPosition()["y"] + other.getSize()["h"] + 5);
                    }
                }
                break;
            }
        }
        if (moved) {
            for (var i = 0; i != this.widgets.length; i++) {
                if (this.widgets[i] != widget && this.widgets[i].fixed == false)
                    this.organize(this.widgets[i]);
            }
        }
    };
    WidgetManager.prototype.unregisterWidget = function (widget, del) {
        for (var i = 0; i != this.widgets.length; i++) {
            if (this.widgets[i] == widget) {
                if (del == undefined || del == null || del == true) {
                    console.log("trying clean");
                    this.widgets[i].onDelete();
                }
                this.widgets.splice(i);
                return true;
            }
        }
        return false;
    };
    WidgetManager.Widgets = [
        DateWidget,
        PictureWidget,
        SportWidget,
        TwitterWidget,
        YoutubeWidget,
        MapsWidget,
        MeteoWidget,
    ];
    return WidgetManager;
}());
//# sourceMappingURL=WidgetManager.js.map
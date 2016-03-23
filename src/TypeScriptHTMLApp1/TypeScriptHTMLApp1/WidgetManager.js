var WidgetManager = (function () {
    function WidgetManager(node) {
        this.widgets = new Array();
        this.node = node;
    }
    WidgetManager.prototype.registerWidget = function (widget) {
        for (var i = 0; i != this.widgets.length; i++) {
            if (this.widgets[i] == widget)
                return false;
        }
        widget.setParent(this.node);
        this.widgets.push(widget);
        this.organize();
        return true;
    };
    WidgetManager.prototype.organize = function () {
        var done = true;
        for (var i = 0; i != this.widgets.length; i++) {
            for (var u = 0; u != this.widgets.length; u++) {
                if (this.widgets[i] == this.widgets[u] || this.widgets[i] == undefined || this.widgets[u] == undefined)
                    continue;
                if (this.widgets[i].onCollid(this.widgets[u])) {
                    //Correction de l'intersection horizontale
                    //Collision par la gauche
                    var intersect = this.widgets[u].getPosition()["x"] + this.widgets[u].getSize()["w"] - this.widgets[i].getPosition()["x"];
                    if (intersect > 0) {
                        this.widgets[i].move(this.widgets[i].getPosition()["x"] + intersect, 0);
                    }
                    //Collision par la droite
                    intersect = this.widgets[i].getPosition()["x"] + this.widgets[i].getSize()["w"] - this.widgets[u].getPosition()["x"];
                    if (intersect > 0) {
                        this.widgets[i].move(this.widgets[i].getPosition()["x"] + intersect, 0);
                    }
                    //Correction de l'intersection verticale
                    //Collision par le haut
                    var intersect = this.widgets[u].getPosition()["y"] + this.widgets[u].getSize()["h"] - this.widgets[i].getPosition()["y"];
                    if (intersect > 0) {
                        this.widgets[i].move(0, this.widgets[i].getPosition()["y"] + intersect);
                    }
                    //Collision par la droite
                    intersect = this.widgets[i].getPosition()["y"] + this.widgets[i].getSize()["h"] - this.widgets[u].getPosition()["y"];
                    if (intersect > 0) {
                        this.widgets[i].move(0, this.widgets[i].getPosition()["y"] + intersect);
                    }
                    done = false;
                }
            }
        }
        if (done == false)
            this.organize();
    };
    WidgetManager.prototype.unregisterWidget = function (widget) {
        for (var i = 0; i != this.widgets.length; i++) {
            if (this.widgets[i] == widget) {
                this.widgets[i].onDelete();
                this.widgets.splice(i);
                return true;
            }
        }
        return false;
    };
    return WidgetManager;
}());
//# sourceMappingURL=WidgetManager.js.map
/// <reference path="app.ts"/>
/// <reference path="Ajax.ts"/>
var Widget = (function () {
    function Widget(x, y) {
        var _this = this;
        this.counter = 0;
        this.conflicts = new Array();
        this.fixed = false;
        this.name = "";
        this.div = document.createElement("div");
        this.div.draggable = true;
        this.div.onmousedown = function (e) {
            e.stopPropagation();
            App.manager.setMoving(_this);
        };
        this.content = document.createElement("div");
        this.content.style.position = "relative";
        this.content.classList.add("codehilite");
        this.div.classList.add("widget");
        this.style = document.createElement("style");
        this.width = 0;
        this.height = 0;
        this.move(x, y);
        this.canScroll(false);
        this.onCreate();
    }
    Widget.prototype.load = function () {
        return true;
    };
    Widget.prototype.intersects = function (x, y, w, h) {
        if (this.x + this.width >= x && this.x <= x + w && this.y + this.height >= y && this.y <= y + h) {
            return true;
        }
        return false;
    };
    Widget.prototype.setSize = function (w, h) {
        this.width = w;
        this.height = h;
        this.onUpdate();
        App.manager.organize(this);
    };
    Widget.prototype.setParent = function (node) {
        this.parent = node;
        this.parent.appendChild(this.div);
    };
    Widget.prototype.onCreate = function () {
        this.onUpdate();
    };
    Widget.prototype.getPosition = function () {
        var res = new Array();
        res["x"] = this.x;
        res["y"] = this.y;
        return res;
    };
    Widget.prototype.move = function (x, y) {
        console.log("to :" + x + " " + y);
        this.x = x;
        this.y = y;
        this.onMoving();
    };
    Widget.prototype.getSize = function () {
        var res = new Array();
        res["w"] = this.width;
        res["h"] = this.height;
        return res;
    };
    Widget.prototype.onCollid = function (other) {
        if (this.x + this.width >= other.x && this.x <= other.x + other.width && this.y + this.height >= other.y && this.y <= other.y + other.height) {
            return true;
        }
        return false;
    };
    Widget.prototype.contains = function (x, y) {
        if (this.x + this.width >= x && this.x <= x && this.y + this.height >= y && this.y <= y) {
            return true;
        }
        return false;
    };
    Widget.prototype.onDelete = function () {
        if (this.div != undefined && this.parent != undefined)
            this.parent.removeChild(this.div);
    };
    Widget.prototype.setContent = function (content) {
        this.content.innerHTML = "";
        this.content.appendChild(content);
    };
    Widget.prototype.canScroll = function (can) {
        if (can)
            this.div.style.overflowY = "auto";
        else
            this.div.style.overflowY = "hidden";
    };
    Widget.prototype.onMoving = function () {
        var _this = this;
        this.conflicts = new Array();
        App.manager.getWidgets().forEach(function (other) {
            if (other != _this && _this.onCollid(other)) {
                console.log("Conflit de " + _this.name + " avec " + other.name);
                _this.conflicts.push(other);
            }
        });
        if (App.manager.moving == this && this.conflicts.length == 0) {
            if (this.x < 0)
                this.x = 0;
            if (this.y < 70)
                this.y = 70;
            if (this.parent == undefined)
                return;
            if (this.x + this.width > this.parent.clientWidth)
                this.x = this.parent.clientWidth - this.width;
            if (this.y + this.height > this.parent.clientHeight)
                this.y = this.parent.clientHeight - this.height;
        }
        else {
            if (this.parent == undefined)
                return;
            if (this.x < 0)
                this.x = this.parent.clientWidth - this.width;
            if (this.y < 70)
                this.y = this.parent.clientHeight - this.height;
            if (this.x + this.width > this.parent.clientWidth)
                this.x = 0;
            if (this.y + this.height > this.parent.clientHeight)
                this.y = 70;
        }
        this.onUpdate();
    };
    Widget.prototype.closeWidget = function () {
        App.manager.unregisterWidget(this);
    };
    Widget.prototype.onStartMoving = function () {
    };
    Widget.prototype.onStopMoving = function () {
    };
    Widget.prototype.onUpdate = function () {
        var _this = this;
        this.div.innerHTML = "";
        var title = document.createElement("h1");
        title.innerHTML = this.name;
        if (this.fixed == false) {
            var close = document.createElement("button");
            close.innerHTML = "X";
            close.classList.add("close");
            close.onclick = function () {
                _this.closeWidget();
            };
            title.appendChild(close);
        }
        this.div.appendChild(title);
        if (this.content.dataset["state"] != "no-update")
            this.div.appendChild(this.content);
        this.div.style.position = "absolute";
        this.div.style.top = this.y.toString() + "px";
        this.div.style.left = this.x.toString() + "px";
        this.div.style.width = this.width.toString() + "px";
        this.div.style.height = this.height.toString() + "px";
    };
    Widget.prototype.getCenter = function () {
        var res = new Array();
        res["x"] = this.x + this.width / 2;
        res["y"] = this.y + this.height / 2;
        return res;
    };
    return Widget;
}());
//# sourceMappingURL=Widget.js.map



class WidgetManager {

        private widgets: Array<Widget>;
        private node: HTMLElement;

        constructor(node: HTMLElement) {
            this.widgets = new Array();
            this.node = node;
        }

        public registerWidget(widget: Widget): boolean {
            for (var i: number = 0; i != this.widgets.length; i++) {
                if (this.widgets[i] == widget)
                    return false;
            }
            widget.setParent(this.node);
            this.widgets.push(widget);
            this.organize(widget);
            return true;
        }

        private organize(widget: Widget): void {
            for (var i: number = 0; i != this.widgets.length; i++) {
                var other: Widget = this.widgets[i];
                if (other == widget)
                    continue;
                if (other.onCollid(widget)) {
                    var x: number = other.getCenter()["x"] - widget.getCenter()["x"];
                    var y: number = other.getCenter()["y"] - widget.getCenter()["y"];
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
                            widget.move( widget.getPosition()["x"], other.getPosition()["y"] - widget.getSize()["h"] - 5);
                        }
                        else {
                            widget.move(widget.getPosition()["x"], other.getPosition()["y"] + other.getSize()["h"]+ 5);
                        }
                    }
                }
            }
        }

        public unregisterWidget(widget: Widget): boolean {
            for (var i: number = 0; i != this.widgets.length; i++) {
                if (this.widgets[i] == widget) {
                    this.widgets[i].onDelete();
                    this.widgets.splice(i);
                    return true;
                }
            }
            return false;
        }

    }
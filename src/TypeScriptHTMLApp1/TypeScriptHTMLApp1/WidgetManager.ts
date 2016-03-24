


class WidgetManager {

        private widgets: Array<Widget>;
        private node: HTMLElement;
        private moving: Widget; 

        constructor(node: HTMLElement) {
            this.moving = undefined;
            this.widgets = new Array();
            this.node = node;
            this.node.onmousemove = (e) => {
                this.onDragOver(e);
            };
            this.node.onmouseup = () => {
                this.onDragStop();
            };
        }

        private onDragStop(): void {
            if (this.moving != undefined) {
                this.organize(this.moving);
                this.moving.div.style.transitionProperty = "all";
                this.moving.div.style.zIndex = "0";
            }
            this.moving = undefined;
        }

        private onDragOver(e): void {
            if (this.moving == undefined) {
                return;
            }
            this.moving.div.style.transitionProperty = "none";
            this.moving.div.style.zIndex = "100";

            this.moving.move(e.pageX-this.moving.width/2, e.pageY-this.moving.height/2);
        }

        public setMoving(moving: Widget) {
            this.moving = moving;
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
            var moved: boolean = false;
            for (var i: number = 0; i != this.widgets.length; i++) {
                var other: Widget = this.widgets[i];
                if (other == widget)
                    continue;
                if (other.onCollid(widget)) {
                    moved = true;
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
                    break;
                }
            }
            if (moved) {
                for (var i = 0; i != this.widgets.length; i++) {
                    if(this.widgets[i] != widget)
                        this.organize(this.widgets[i]);
                }

            }
        }

        public unregisterWidget(widget: Widget, del?:boolean): boolean {
            for (var i: number = 0; i != this.widgets.length; i++) {
                if (this.widgets[i] == widget) {
                    if(del == undefined || del == true)
                        this.widgets[i].onDelete();
                    this.widgets.splice(i);
                    return true;
                }
            }
            return false;
        }

    }
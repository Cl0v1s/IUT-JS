


class WidgetManager {

        private widgets: Array<Widget>;
        private node: HTMLElement;
        public moving: Widget;

        static Widgets = [
            DateWidget, 
            PictureWidget, 
            SportWidget,
            TwitterWidget, 
            YoutubeWidget,
            MapsWidget, 
            MeteoWidget,
        ];

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

        public exists(clas: any): boolean {
            for (var i = 0; i != this.widgets.length; i++) {
                if (this.widgets[i] instanceof clas)
                    return true;
            }
            return false;
        }

        private onDragStop(): void {
            if (this.moving != undefined) {
                this.organize(this.moving);
                this.moving.div.style.transitionProperty = "all";
                this.moving.div.style.zIndex = "0";
            }
            this.moving = undefined;
        }

        public getFreeZone(w: number, h: number): any {
            var object = { x: null, y: null };
            for (var i = 0; i != this.node.clientWidth - w; i++) {
                for (var u = 0; u != this.node.clientHeight - h; u++) {
                    for (var p = 0; p != this.widgets.length; p++) {
                        if (this.widgets[i].intersects(i, u, w, h) == false) {
                            object.x = i; object.y = u;
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
            if(moving.fixed == false)
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

        public organize(widget: Widget): void {
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
                    if (this.widgets[i] != widget && this.widgets[i].fixed == false)
                        this.organize(this.widgets[i]);
                }

            }
        }

        public unregisterWidget(widget: Widget, del?:boolean): boolean {
            for (var i: number = 0; i != this.widgets.length; i++) {
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
        }

    }
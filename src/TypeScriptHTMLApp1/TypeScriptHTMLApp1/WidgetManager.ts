


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
            setInterval(() => {
                this.update();
            }, 50);
        }

        public getWidgets(): Array<Widget> {
            return this.widgets;
        }

        public exists(clas: any): boolean {
            for (var i = 0; i != this.widgets.length; i++) {
                if (this.widgets[i] instanceof clas)
                    return true;
            }
            return false;
        }

        public update() {
            this.widgets.forEach((widget: Widget) => {
                if (widget.fixed == false) {
                    if (this.organize(widget))
                        widget.counter++;
                    else
                        widget.counter = 0;
                    if (widget.counter >= 3) {
                        var place = this.getRandomZone();
                        widget.move(place.x, place.y);
                        widget.counter = 0;
                    }
                }
            });
        }

        private onDragStop(): void {
            if (this.moving != undefined) {
                this.organize(this.moving);
                this.moving.div.style.transitionProperty = "all";
                this.moving.div.style.zIndex = "0";
            }
            this.moving = undefined;
        }

        public getRandomZone(): any {
            var object = { x: null, y: null };
            object.x = Math.floor(Math.random() * this.node.clientWidth);
            object.y = Math.floor(Math.random() * (this.node.clientHeight - 70)) + 70;
            return object;
        }

        private onDragOver(e): void {
            if (this.moving == undefined) {
                return;
            }
            this.moving.div.style.transitionProperty = "none";
            this.moving.div.style.zIndex = "100";
            this.moving.conflicts.forEach((other: Widget) => {
                if (other != this.moving && other.fixed == false)
                    this.organize(other);
            });
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

        public organize(widget: Widget): boolean {
            
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
                        if (x > 0) {
                            widget.move(other.getPosition()["x"] - widget.getSize()["w"] - 5, widget.getPosition()["y"]);
                        }
                        else {
                            widget.move(other.getPosition()["x"] + other.getSize()["w"] + 5, widget.getPosition()["y"]);

                        }
                    }
                    else {

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
                widget.conflicts.forEach((other: Widget) => {
                    if(other.fixed == false)
                        this.organize(other);
                });

            }
            return moved;
            
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
/// <reference path="DateWidget.ts"/>
/// <reference path="PictureWidget.ts"/>
/// <reference path="SportWidget.ts"/>
/// <reference path="TwitterWidget.ts"/>
/// <reference path="YoutubeWidget.ts"/>
/// <reference path="MapsWidget.ts"/>
/// <reference path="MeteoWidget.ts"/>
/// <reference path="twitter.d.ts" />

/*
    WidgetManager 
    Classe charger de gérer les widgets 
 */
var WidgetManager = (function () {

    /**
     * Constructeur 
     * @param {[type]} noeud sur lequel agit le manager et sur lequel placer les widgets
     */
    function WidgetManager(node) {
        var _this = this;
        this.loaded = false;
        this.moving = undefined;
        this.widgets = new Array();
        this.node = node;
        this.node.onmousemove = function (e) {
            _this.onDragOver(e);
        };
        this.node.onmouseup = function () {
            _this.onDragStop();
        };
        setInterval(function () {
            _this.update();
        }, 50);
    }

    /**
     * save
     * Sauvegarde les informations relatives aux widgets en mémoire (position+etats)
     */
    WidgetManager.prototype.save = function () {
        if (this.loaded) {
            console.log("saving " + JSON.stringify(this.widgets));
            localStorage.setItem("WidgetManager", JSON.stringify(this.widgets));
        }
    };

    /**
     * load
     * charge les informations relatives aux widgets en mémoire 
     */
    WidgetManager.prototype.load = function () {
        var _this = this;
        this.loaded = true;
        if (localStorage.getItem("WidgetManager") == null || localStorage.getItem("WidgetManager") == undefined)
            return;
        console.log("Starting loading");
        var model = new Array();
        WidgetManager.Widgets.forEach(function (cl) {
            model.push(new cl(0, 0));
        });
        var data = JSON.parse(localStorage.getItem("WidgetManager"));
        console.log(data);
        data.forEach(function (e) {
            for (var i = 0; i != model.length; i++) {
                if (model[i].name == e.name) {
                    var w = new WidgetManager.Widgets[i](e.x, e.y);
                    _this.registerWidget(w);
                    w.x = e.x;
                    w.y = e.y;
                    console.log("new " + w.name);
                    break;
                }
            }
        });
        twttr.widgets.load();
    };

    /**
     * getWidgets
     * Retourne la liste des widgets
     * @return {[type]} Liste des widgets
     */
    WidgetManager.prototype.getWidgets = function () {
        return this.widgets;
    };

    /**
     * exists
     * vérifie si une instance d'une classe de widgets existe déja dans al liste ou non
     * @param  {[type]} classe à tester
     * @return {[type]} vrai si oui, faux sinon
     */
    WidgetManager.prototype.exists = function (clas) {
        for (var i = 0; i != this.widgets.length; i++) {
            if (this.widgets[i] instanceof clas)
                return true;
        }
        return false;
    };

    /**
     * update
     * Met à jour les widgets et évitant les collisions notamment
     */
    WidgetManager.prototype.update = function () {
        var _this = this;
        this.widgets.forEach(function (widget) {
            if (widget.fixed == false && _this.moving != widget) {
                if (_this.organize(widget))
                    widget.counter++;
                else
                    widget.counter = 0;
                if (widget.counter >= 3) {
                    var place = _this.getRandomZone();
                    widget.move(place.x, place.y);
                    widget.counter = 0;
                }
            }
        });
        this.save();
    };

    /**
     * onDragStop
     * Action a réaliser lors de l'arret du déplacement d'un widget
     */
    WidgetManager.prototype.onDragStop = function () {
        var _this = this;
        if (this.moving != undefined) {
            this.moving.conflicts.forEach(function (other) {
                if (other != _this.moving && other.fixed == false)
                    _this.organize(other);
            });
            this.moving.div.style.transitionProperty = "all";
            this.moving.div.style.zIndex = "0";
            this.moving.onStopMoving();
            this.save();
        }
        this.moving = undefined;
    };

    /**
     * getRandomZone
     * Récupère des coordonées de manière aléaoire
     * @return {[type]} coordonnées
     */
    WidgetManager.prototype.getRandomZone = function () {
        var object = { x: null, y: null };
        object.x = Math.floor(Math.random() * this.node.clientWidth);
        object.y = Math.floor(Math.random() * (this.node.clientHeight - 70)) + 70;
        return object;
    };

    /**
     * onDragOver
     * Actions à réaliser pendant le déplacement d'un widget
     * @param  {[type]} évenement de souris 
     */
    WidgetManager.prototype.onDragOver = function (e) {
        if (this.moving == undefined) {
            return;
        }
        this.moving.div.style.transitionProperty = "none";
        this.moving.onStartMoving();
        this.moving.div.style.zIndex = "100";
        this.moving.move(e.pageX, e.pageY);
    };

    /**
     * setMoving
     * Règle le widget à déplacer
     * @param {[type]} widget à déplacer
     */
    WidgetManager.prototype.setMoving = function (moving) {
        if (moving.fixed == false)
            this.moving = moving;
    };

    /**
     * registerWidget
     * Enregistre un nouveau widget à gérer
     * @param  {[type]} nouveau widget
     */
    WidgetManager.prototype.registerWidget = function (widget) {
        for (var i = 0; i != this.widgets.length; i++) {
            if (this.widgets[i] == widget)
                return false;
        }
        widget.setParent(this.node);
        this.widgets.push(widget);
        this.organize(widget);
        this.save();
        return true;
    };

    /**
     * organize 
     * Déplace le widget de facon à éviter les collisions
     * @param  {[type]} widget à organiser
     */
    WidgetManager.prototype.organize = function (widget) {
        var _this = this;
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
                    if (x > 0) {
                        widget.move(other.getPosition()["x"] - widget.getSize()["w"] - 5, widget.getPosition()["y"]);
                    }
                    else {
                        widget.move(other.getPosition()["x"] + other.getSize()["w"] + 5, widget.getPosition()["y"]);
                    }
                }
                else {
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
            widget.conflicts.forEach(function (other) {
                if (other.fixed == false)
                    _this.organize(other);
            });
        }
        return moved;
    };

    /**
     * unregisterWidget
     * Supprime un widget de la liste des widgets à gérer
     * @param  {[type]} widget à supprimer
     * @param  {[type]} si vrai, supprime réellement le widget si faux, arrète juste de le gérer
     * @return {[type]}
     */
    WidgetManager.prototype.unregisterWidget = function (widget, del) {
        for (var i = 0; i != this.widgets.length; i++) {
            if (this.widgets[i] == widget) {
                if (del == undefined || del == null || del == true) {
                    this.widgets[i].onDelete();
                }
                this.widgets.splice(i);
                return true;
            }
        }
        return false;
    };

    /*
        Liste des classes de widgets pouvant être instanciées par le système
     */
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
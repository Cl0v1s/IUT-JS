/// <reference path="app.ts"/>
/// <reference path="Ajax.ts"/>

/*
    Widget
    Classe de base permettant de représenter et de gérer un widget à l'écran
 */
var Widget = (function () {

    /**
     * Constructeur
     * Créer un nouveau Widget
     * @param {[type]} position x
     * @param {[type]} position y
     */
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

    /**
     * load 
     * permet de charger les données en mémoire sur le widget
     * @return {[type]} vrai si chargement réussi
     */
    Widget.prototype.load = function () {
        return true;
    };

    /**
     * intersects
     * vérifie si le widget coupe le rectangle passé en paramètre
     * @param  {[type]} position x du rectangle
     * @param  {[type]} position y du rectangle
     * @param  {[type]} largeur du rectangle
     * @param  {[type]} hauteur du rectangle
     */
    Widget.prototype.intersects = function (x, y, w, h) {
        if (this.x + this.width >= x && this.x <= x + w && this.y + this.height >= y && this.y <= y + h) {
            return true;
        }
        return false;
    };

    /**
     * setSize
     * change la taille du widget 
     * @param {[type]} nouvelle largeur
     * @param {[type]} nouvelle hauteur
     */
    Widget.prototype.setSize = function (w, h) {
        this.width = w;
        this.height = h;
        this.onUpdate();
        App.manager.organize(this);
    };

    /**
     * setParent
     * Permet de changer le noeud parent du widget
     * @param {[type]} noeud parent
     */
    Widget.prototype.setParent = function (node) {
        this.parent = node;
        this.parent.appendChild(this.div);
    };

    /**
     * onCreate
     * Fonction appelée après la création du widget
     */
    Widget.prototype.onCreate = function () {
        this.onUpdate();
    };

    /**
     * getPosition 
     * Retourne la position du wigget sous forme de tableau
     * @return {[type]} tableau contenant deux entrées x et y 
     */
    Widget.prototype.getPosition = function () {
        var res = new Array();
        res["x"] = this.x;
        res["y"] = this.y;
        return res;
    };

    /**
     * move 
     * Permet de déplacer le widget
     * @param  {[type]} nouvelle position x 
     * @param  {[type]} nouvelle position y
     */
    Widget.prototype.move = function (x, y) {
        this.x = x;
        this.y = y;
        this.onMoving();
    };

    /**
     * getSize
     * Retourne la largeur et la hauteur dans un tableau à deux entrées
     * @return {[type]}tableau contenant deux entrées w et h 
     */
    Widget.prototype.getSize = function () {
        var res = new Array();
        res["w"] = this.width;
        res["h"] = this.height;
        return res;
    };

    /**
     * onCollid
     * Teste la collision entre deux widgets
     * @param  {[type]} autre widget
     * @return {[type]} vrai si collision faux sinon
     */
    Widget.prototype.onCollid = function (other) {
        if (this.x + this.width >= other.x && this.x <= other.x + other.width && this.y + this.height >= other.y && this.y <= other.y + other.height) {
            return true;
        }
        return false;
    };

    /**
     * contains
     * Teste si le widget contient le point passé en paramètre
     * @param  {[type]} position x du point 
     * @param  {[type]} position y du point
     * @return {[type]} vrai si contenu, faux sinon
     */
    Widget.prototype.contains = function (x, y) {
        if (this.x + this.width >= x && this.x <= x && this.y + this.height >= y && this.y <= y) {
            return true;
        }
        return false;
    };

    /**
     * onDelete
     * appelé lors de la suppression du widget
     */
    Widget.prototype.onDelete = function () {
        if (this.parent != undefined)
            this.parent.removeChild(this.div);
    };

    /**
     * setContent
     * Changle le noeud de contenu du widget
     * @param {[type]} nouveau contenu
     */
    Widget.prototype.setContent = function (content) {
        this.content.innerHTML = "";
        this.content.appendChild(content);
    };

    /**
     * canScroll
     * Définit sur le contenu du widget peut scroller ou non
     * @param  {[type]} possibilité de scroller ou non
     */
    Widget.prototype.canScroll = function (can) {
        if (can)
            this.div.style.overflowY = "auto";
        else
            this.div.style.overflowY = "hidden";
    };

    /**
     * onMoving
     * Fonction appelée après le déplacement du widget
     */
    Widget.prototype.onMoving = function () {
        var _this = this;
        this.conflicts = new Array();
        App.manager.getWidgets().forEach(function (other) {
            if (other != _this && _this.onCollid(other)) {
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

    /**
     * closeWidget
     * Permet de fermer le widget
     */
    Widget.prototype.closeWidget = function () {
        App.manager.unregisterWidget(this);
    };

    /**
     * onStartMoving
     * Fonction appelée lors du début du déplacement du widget
     */
    Widget.prototype.onStartMoving = function () {
    };

    /**
     * onStopMoving
     * Fonction appelée lors de la fin du déplacement du widget
     */
    Widget.prototype.onStopMoving = function () {
    };

    /**
     * onUpdate
     * Fonction permettant de mettre à jour le widget
     */
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

    /**
     * getCenter
     * Retourne les coordonnées du centre de ce widget
     * @return {[type]} coordonées du centre du widget
     */
    Widget.prototype.getCenter = function () {
        var res = new Array();
        res["x"] = this.x + this.width / 2;
        res["y"] = this.y + this.height / 2;
        return res;
    };
    return Widget;
}());
//# sourceMappingURL=widget.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/*
    MapsWidget
    Widget permettant d'afficher la carte de votre choix
 */
var MapsWidget = (function (_super) {
    __extends(MapsWidget, _super);
    function MapsWidget() {
        _super.apply(this, arguments);
    }

    /**
     * onCreate
     * Fonction appelée après la création du widget
     */
    MapsWidget.prototype.onCreate = function () {
        this.width = 350;
        this.height = 70;
        this.name = "Maps";
        this.showMap();
        _super.prototype.onCreate.call(this);
    };

    /**
     * load
     * Charge les données stockées dans la mémoire
     * @return {[type]} vrai si chargement a eu lieu, faux sinon
     * 
     */
    MapsWidget.prototype.load = function () {
        return false;
    };

    /**
     * save
     * Sauvegarde les informations dans la mémoire
     * @param  {[type]} information à stocker
     */
    MapsWidget.prototype.save = function (query) {
    };


    /**
     * showMap
     * Affiche la carte
     * @param  {[type]} Nom de la zone à afficher
     */
    MapsWidget.prototype.showMap = function () {
        var _this = this;
        this.setSize(350, 390);
        var div = document.createElement("div");
        div.style.textAlign = "center";
        div.innerHTML = '<iframe width="325" height="325" frameborder="0" style="border: 0" src = "https://www.google.com/maps/embed/v1/directions?origin=here&destination=place_id:ChIJOxKo77zYVA0RluQVWxti6ic&key=AIzaSyDuDkVffqwVK11LhxZ7iWMYPcsZfIwJuGs" allowfullscreen> </iframe>';
        this.setContent(div);
    };

    /**
     * onStartMoving
     * Fonction appelée lors du début du déplacement du widget
     */
    MapsWidget.prototype.onStartMoving = function () {
        if (this.content.dataset["state"] != "no-update")
            this.div.removeChild(this.content);
        this.content.dataset["state"] = "no-update";
    };

    /**
     * onStopMoving
     * Fonction appelée lors de la fin du déplacement du widget
     */
    MapsWidget.prototype.onStopMoving = function () {
        if (this.content.dataset["state"] == "no-update")
            this.div.appendChild(this.content);
        this.content.dataset["state"] = undefined;
    };
    return MapsWidget;
}(Widget));
//# sourceMappingURL=MapsWidget.js.map
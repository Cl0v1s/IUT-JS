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
        if (!this.load())
            this.showForm();
        _super.prototype.onCreate.call(this);
    };

    /**
     * showForm
     * Affiche le formulaire permettant de choisir le nom de la zone à afficher
     */
    MapsWidget.prototype.showForm = function () {
        var _this = this;
        this.setSize(350, 70);
        var div = document.createElement("div");
        div.innerHTML = "<input type='text' placeholder='Entrez une ville...'>";
        var button = document.createElement("button");
        button.innerHTML = "Envoyer";
        button.addEventListener("click", function () {
            _this.handleForm();
        });
        div.appendChild(button);
        this.setContent(div);
    };

    /**
     * handleForm
     * Traite les informations indiquées dans le formulaire
     */
    MapsWidget.prototype.handleForm = function () {
        var search = this.content.getElementsByTagName("input")[0].value;
        if (search == "")
            return;
        this.save(search);
        this.showMap(search);
    };

    /**
     * load
     * Charge les données stockées dans la mémoire
     * @return {[type]} vrai si chargement a eu lieu, faux sinon
     * 
     */
    MapsWidget.prototype.load = function () {
        if (localStorage.getItem("MapsWidget") == null || localStorage.getItem("MapsWidget") == undefined) {
            return false;
        }
        this.showMap(localStorage.getItem("MapsWidget"));
        return true;
    };

    /**
     * save
     * Sauvegarde les informations dans la mémoire
     * @param  {[type]} information à stocker
     */
    MapsWidget.prototype.save = function (query) {
        localStorage.setItem("MapsWidget", query);
    };


    /**
     * showMap
     * Affiche la carte
     * @param  {[type]} Nom de la zone à afficher
     */
    MapsWidget.prototype.showMap = function (data) {
        var _this = this;
        this.setSize(350, 390);
        var div = document.createElement("div");
        div.style.textAlign = "center";
        div.innerHTML = '<iframe width="325" height="325" frameborder="0" style="border: 0" src = "https://www.google.com/maps/embed/v1/place?q=' + data + '&key=AIzaSyDuDkVffqwVK11LhxZ7iWMYPcsZfIwJuGs" allowfullscreen> </iframe>';
        var button = document.createElement("button");
        button.innerHTML = "Retour";
        button.addEventListener("click", function () {
            _this.showForm();
        });
        div.appendChild(button);
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
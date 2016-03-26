var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/*
    SportWidget
    Widget affichant les informations sur l'équipe de munich
 */
var SportWidget = (function (_super) {
    __extends(SportWidget, _super);
    function SportWidget() {
        _super.apply(this, arguments);
    }

    /**
     * onCreate
     * Fonction appelée après la création du widget
     */
    SportWidget.prototype.onCreate = function () {
        this.width = 350;
        this.height = 170;
        this.name = "Sport - Bayern de Munich";
        this.showContent();
        _super.prototype.onCreate.call(this);
    };

    /**
     * showContent
     * Affiche le contenu du widget
     */
    SportWidget.prototype.showContent = function () {
        var _this = this;
        var headers = {};
        headers["X-Auth-Token"] = "67d369040a2c457ca9b312adad4e11c0";
        Ajax.Get("http://api.football-data.org/v1/teams/5", null, function (data) {
            _this.handleContent(data);
        }, undefined, headers);
    };

    /**
     * handleContent
     * Gère les informations récupérées de la requète
     * @param  {[type]} informations distantes
     */
    SportWidget.prototype.handleContent = function (data) {
        var result = JSON.parse(data);
        if (result == undefined)
            return;
        else
            this.showTeam(result);
    };
    SportWidget.prototype.showTeam = function (data) {
        var div = document.createElement("div");
        div.style.textAlign = "center";
        div.innerHTML = "\
        <img src='" + data.crestUrl + "' width=50 height=50><br>\
        <strong>Nom:</strong> " + data.name + "<br>\
        <strong>Code:</strong> " + data.code + "<br>\
        <strong>Valeur:</strong> " + data.squadMarketValue + "<br>\
        ";
        this.setContent(div);
    };
    return SportWidget;
}(Widget));
//# sourceMappingURL=SportWidget.js.map
/// <reference path="widget.ts"/>
/// <reference path="Ajax.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MeteoWidget = (function (_super) {
    __extends(MeteoWidget, _super);
    function MeteoWidget() {
        _super.apply(this, arguments);
    }
    MeteoWidget.prototype.onCreate = function () {
        this.name = "Meteo";
        this.width = 300;
        this.height = 200;
        this.showForm();
        _super.prototype.onCreate.call(this);
    };
    MeteoWidget.prototype.showForm = function () {
        var _this = this;
        var div = document.createElement("div");
        div.innerHTML = "<input type='text' placeholder='Nom de la ville...'>";
        var sub = document.createElement("button");
        sub.innerHTML = "Rechercher";
        sub.addEventListener("click", function () { _this.formClick(_this); });
        div.appendChild(sub);
        this.setContent(div);
    };
    MeteoWidget.prototype.formClick = function (self) {
        var city;
        var input = this.content.getElementsByTagName("input")[0];
        city = input.value;
        Ajax.Get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=b19cfe2f2d3dc28a55fb7261fe36827a", undefined, function (res) {
            var data = JSON.parse(res);
            var div = document.createElement("div");
            div.innerHTML = "\
                C°: <span class='k'>" + data.main.temp + "</span><br>\
                Humidité: <span class='k'>" + data.main.humidity + "</span><br>\
                Description: <span class='k'>" + data.weather[0].description + "</span><br>\
            ";
            var back = document.createElement("button");
            back.innerHTML = "Retour";
            back.addEventListener("click", function () { self.showForm(); });
            div.appendChild(back);
            self.setContent(div);
        });
    };
    return MeteoWidget;
}(Widget));
//# sourceMappingURL=MeteoWidget.js.map
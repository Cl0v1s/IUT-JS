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
        this.name = "widget-meteo";
        this.width = 300;
        this.height = 200;
        this.div.innerHTML = "<h1>Meteo</h1>";
        var div = document.createElement("div");
        div.classList.add("codehilite");
        div.id = "form";
        div.innerHTML = "<input type='text' id='widget-meteo-name' placeholder='Nom de la ville...'>";
        var sub = document.createElement("button");
        sub.innerHTML = "Rechercher";
        sub.addEventListener("click", this.formClick);
        div.appendChild(sub);
        this.div.appendChild(div);
        _super.prototype.onCreate.call(this);
    };
    MeteoWidget.prototype.formClick = function () {
        var city;
        var input = document.getElementById("widget-meteo-name");
        city = input.value;
        Ajax.Get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=b19cfe2f2d3dc28a55fb7261fe36827a", undefined, function (res) {
            var data = JSON.parse(res);
            var div = document.createElement("div");
            div.classList.add("codehilite");
            div.innerHTML = "\
                C°: <span class='k'>" + data.main.temp + "</span><br>\
                Humidité: <span class='k'>" + data.main.humidity + "</span><br>\
                Descriptio: <span class='k'>" + data.weather[0].description + "</span>\
            ";
            var parent = document.getElementById("widget-meteo");
            if (parent != undefined) {
                parent.innerHTML = "<h1>Meteo</h1>";
                parent.appendChild(div);
            }
        });
    };
    return MeteoWidget;
}(Widget));

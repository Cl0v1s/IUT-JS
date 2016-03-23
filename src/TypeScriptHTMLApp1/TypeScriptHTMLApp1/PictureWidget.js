/// <reference path="widget.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PictureWidget = (function (_super) {
    __extends(PictureWidget, _super);
    function PictureWidget() {
        _super.apply(this, arguments);
    }
    PictureWidget.prototype.onCreate = function () {
        this.width = 250;
        this.height = 400;
        this.name = "Photo";
        this.showForm();
        _super.prototype.onCreate.call(this);
    };
    PictureWidget.prototype.showForm = function () {
        var _this = this;
        var div = document.createElement("div");
        div.innerHTML = "<input type='text' placeholder='Entrez un mot-clef'>";
        var button = document.createElement("button");
        button.innerText = "Chercher";
        button.addEventListener('click', function () { _this.formClick(_this); });
        div.appendChild(button);
        this.setContent(div);
    };
    PictureWidget.prototype.formClick = function (self) {
        var _this = this;
        var search = document.getElementsByTagName("input")[0].value;
        if (search == undefined || search == "")
            return;
        //rechercher l'api
        var headers = {};
        headers["Authorization"] = "Client-ID a6284859047b915";
        Ajax.Get("https://api.imgur.com/3/gallery/search/?q=" + search + "&client", null, function (data) {
            _this.handleGallery(_this, data);
        }, undefined, headers);
    };
    PictureWidget.prototype.handleGallery = function (self, data) {
        var result = JSON.parse(data);
        var picture = result.data[Math.floor(Math.random() * result.data.length)];
        var counter = 0;
        while (picture == undefined || picture.type == undefined || (picture.type.indexOf("image/") == -1 && counter < 50)) {
            picture = result.data[Math.floor(Math.random() * result.data.length)];
            counter++;
        }
        if (picture != undefined) {
            self.showPicture(picture);
        }
        else
            alert("Aucune image n'a ete trouvee.");
    };
    PictureWidget.prototype.showPicture = function (picture) {
        var _this = this;
        this.canScroll(true);
        var div = document.createElement("div");
        div.style.textAlign = "center";
        var img = document.createElement("img");
        img.height = 200;
        img.src = picture.link;
        div.appendChild(img);
        var title = document.createElement("div");
        title.style.textAlign = "left";
        title.innerHTML = "<h2>" + picture.title + "</h2>";
        if (picture.description != null)
            title.innerHTML += picture.description;
        else
            title.innerHTML = "Pas de description";
        div.appendChild(title);
        var button = document.createElement("button");
        button.innerHTML = "Retour";
        button.addEventListener("click", function () {
            _this.showForm();
        });
        div.appendChild(button);
        this.setContent(div);
    };
    return PictureWidget;
}(Widget));
//# sourceMappingURL=PictureWidget.js.map
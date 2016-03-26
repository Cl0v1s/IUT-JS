/// <reference path="widget.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var YoutubeWidget = (function (_super) {
    __extends(YoutubeWidget, _super);
    function YoutubeWidget() {
        _super.apply(this, arguments);
    }
    YoutubeWidget.prototype.onCreate = function () {
        this.name = "Youtube";
        this.width = 350;
        this.height = 70;
        this.showForm();
        _super.prototype.onCreate.call(this);
    };
    YoutubeWidget.prototype.showForm = function () {
        var _this = this;
        this.setSize(350, 70);
        var content = document.createElement("div");
        content.innerHTML = "<input type='text' placeholder='Entrez un mot-clef'>";
        var button = document.createElement("button");
        button.innerHTML = "Envoyer";
        button.addEventListener("click", function () {
            _this.handleForm();
        });
        content.appendChild(button);
        this.setContent(content);
    };
    YoutubeWidget.prototype.handleForm = function () {
        var _this = this;
        var search = (this.content.getElementsByTagName("input")[0].value);
        if (search == "")
            return;
        var header = {};
        //header["X-GData-Key"] = "AIzaSyDuDkVffqwVK11LhxZ7iWMYPcsZfIwJuGs";
        Ajax.Get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyDuDkVffqwVK11LhxZ7iWMYPcsZfIwJuGs&part=snippet&q=" + search, null, function (data) {
            _this.handleResult(_this, data);
        }, null, header);
    };
    YoutubeWidget.prototype.handleResult = function (self, data) {
        var result = JSON.parse(data);
        if (result == undefined || result.items == undefined) {
            alert("Une erreur est survenue lors du traitement de la requete.");
            return;
        }
        var video = result.items[Math.floor(Math.random() * result.items.length)];
        var counter = 0;
        while ((video == undefined || video.id == undefined || video.id.kind.indexOf("video") == -1) && counter < 50) {
            console.log(video.id.kind);
            video = result.items[Math.floor(Math.random() * result.items.length)];
            counter++;
        }
        if (counter >= 50) {
            alert("Aucune video trouvee.");
            return;
        }
        this.showVideo(video);
    };
    YoutubeWidget.prototype.onStartMoving = function () {
        if (this.content.dataset["state"] != "no-update")
            this.div.removeChild(this.content);
        this.content.dataset["state"] = "no-update";
    };
    YoutubeWidget.prototype.onStopMoving = function () {
        if (this.content.dataset["state"] == "no-update")
            this.div.appendChild(this.content);
        this.content.dataset["state"] = undefined;
    };
    YoutubeWidget.prototype.showVideo = function (video) {
        var _this = this;
        console.log(video);
        this.setSize(350, 380);
        var link = video.id.videoId;
        var content = document.createElement("div");
        content.style.textAlign = "center";
        content.innerHTML = "<iframe width='350' height='315' src = 'http://www.youtube.com/embed/" + link + "?autoplay=1' style='border:0px;'></iframe>";
        var button = document.createElement("button");
        button.innerHTML = "Retour";
        button.addEventListener("click", function () {
            _this.showForm();
        });
        content.appendChild(button);
        this.setContent(content);
    };
    return YoutubeWidget;
}(Widget));
//# sourceMappingURL=YoutubeWidget.js.map
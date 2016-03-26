/// <reference path="widget.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/*
    YoutubeWidget
    Widget permettant d'afficher une vidéo youtube
 */
var YoutubeWidget = (function (_super) {
    __extends(YoutubeWidget, _super);
    function YoutubeWidget() {
        _super.apply(this, arguments);
    }

    /**
     * onCreate
     * Fonction appelée après la création du widget
     */
    YoutubeWidget.prototype.onCreate = function () {
        this.name = "Youtube";
        this.width = 350;
        this.height = 70;
        if (!this.load())
            this.showForm();
        _super.prototype.onCreate.call(this);
    };

    /**
     * showForm
     * Affiche le formulaire permettant de choisir le nom de la zone à afficher
     */
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

    /**
     * handleForm
     * Traite les informations indiquées dans le formulaire
     */
    YoutubeWidget.prototype.handleForm = function () {
        var search = (this.content.getElementsByTagName("input")[0].value);
        if (search == "")
            return;
        this.save(search);
        this.getData(search);
    };

    /**
     * save
     * Sauvegarde les informations dans la mémoire
     * @param  {[type]} information à stocker
     */
    YoutubeWidget.prototype.save = function (video) {
        localStorage.setItem("YoutubeWidget", JSON.stringify(video));
    };

    /**
     * load
     * Charge les données stockées dans la mémoire
     * @return {[type]} vrai si chargement a eu lieu, faux sinon
     * 
     */
    YoutubeWidget.prototype.load = function () {
        if (localStorage.getItem("YoutubeWidget") == null || localStorage.getItem("YoutubeWidget") == undefined) {
            return false;
        }
        this.showVideo(JSON.parse(localStorage.getItem("YoutubeWidget")));
        return true;
    };

    /**
     * getData
     * Lance la récupération des informations distantes
     * @param  {[type]} paramètre distant
     */
    YoutubeWidget.prototype.getData = function (query) {
        var _this = this;
        Ajax.Get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyDuDkVffqwVK11LhxZ7iWMYPcsZfIwJuGs&part=snippet&q=" + query, null, function (data) {
            _this.handleResult(_this, data);
        });
    };

    /**
     * handleResult
     * Gère les informations récupérées de la requète
     * @param  {[type]} informations distantes
     */
    YoutubeWidget.prototype.handleResult = function (self, data) {
        var result = JSON.parse(data);
        if (result == undefined || result.items == undefined) {
            alert("Une erreur est survenue lors du traitement de la requete.");
            return;
        }
        var video = result.items[Math.floor(Math.random() * result.items.length)];
        var counter = 0;
        while ((video == undefined || video.id == undefined || video.id.kind.indexOf("video") == -1) && counter < 50) {
            video = result.items[Math.floor(Math.random() * result.items.length)];
            counter++;
        }
        if (counter >= 50) {
            alert("Aucune video trouvee.");
            return;
        }
        this.showVideo(video);
    };

    /**
     * onStartMoving
     * Fonction appelée lors du début du déplacement du widget
     */
    YoutubeWidget.prototype.onStartMoving = function () {
        if (this.content.dataset["state"] != "no-update")
            this.div.removeChild(this.content);
        this.content.dataset["state"] = "no-update";
    };

    /**
     * onStopMoving
     * Fonction appelée lors de la fin du déplacement du widget
     */
    YoutubeWidget.prototype.onStopMoving = function () {
        if (this.content.dataset["state"] == "no-update")
            this.div.appendChild(this.content);
        this.content.dataset["state"] = undefined;
    };


    /**
     * showVideo
     * Affiche la video réceptionnée de la requète
     * @param  {[type]} video réceptionnée
     */
    YoutubeWidget.prototype.showVideo = function (video) {
        var _this = this;
        this.save(video);
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
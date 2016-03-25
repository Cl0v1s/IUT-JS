var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MapsWidget = (function (_super) {
    __extends(MapsWidget, _super);
    function MapsWidget() {
        _super.apply(this, arguments);
    }
    MapsWidget.prototype.onCreate = function () {
        this.width = 350;
        this.height = 70;
        this.name = "Maps";
        this.showForm();
        _super.prototype.onCreate.call(this);
    };
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
    MapsWidget.prototype.handleForm = function () {
        var search = this.content.getElementsByTagName("input")[0].value;
        if (search == "")
            return;
        this.showMap(search);
    };
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
    MapsWidget.prototype.onStartMoving = function () {
        if (this.content.dataset["state"] != "no-update")
            this.div.removeChild(this.content);
        this.content.dataset["state"] = "no-update";
    };
    MapsWidget.prototype.onStopMoving = function () {
        if (this.content.dataset["state"] == "no-update")
            this.div.appendChild(this.content);
        this.content.dataset["state"] = undefined;
    };
    return MapsWidget;
}(Widget));
//# sourceMappingURL=MapsWidget.js.map
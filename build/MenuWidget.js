var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/*
    MenuWidget
    Widget affichant un menu permettant d'ajouter des élements
 */
var MenuWidget = (function (_super) {
    __extends(MenuWidget, _super);
    function MenuWidget() {
        _super.apply(this, arguments);
    }

    /**
     * onCreate
     * Fonction appelée après la création du widget
     */
    MenuWidget.prototype.onCreate = function () {
        var _this = this;
        this.width = window.innerWidth;
        this.height = 70;
        this.fixed = true;
        this.div.style.zIndex = "200";
        this.name = "Menu";
        window.onresize = function () {
            _this.updateSize();
        };
        this.showForm();
        _super.prototype.onCreate.call(this);
    };
    MenuWidget.prototype.updateSize = function () {
        this.width = window.innerWidth;
        this.onUpdate();
    };

    /**
     * showForm
     * Affiche le formulaire permettant de choisir le nom de la zone à afficher
     */
    MenuWidget.prototype.showForm = function () {
        var _this = this;
        var div = document.createElement("div");
        var select = document.createElement("select");
        for (var i = 0; i != WidgetManager.Widgets.length; i++) {
            var option = document.createElement("option");
            var temp = new WidgetManager.Widgets[i](0, 0);
            option.innerHTML = temp.name;
            temp.onDelete();
            option.value = i.toString();
            option.dataset["object"] = i.toString();
            select.appendChild(option);
        }
        div.appendChild(select);
        var button = document.createElement("button");
        button.innerHTML = "Ajouter";
        button.onclick = function () {
            _this.handleForm();
        };
        div.appendChild(button);
        this.setContent(div);
    };

    /**
     * handleForm
     * Traite les informations indiquées dans le formulaire
     */
    MenuWidget.prototype.handleForm = function () {
        var index = this.content.getElementsByTagName("select")[0].value;
        if (App.manager.exists(WidgetManager.Widgets[index]))
            return;
        var object = new WidgetManager.Widgets[index](0, 0);
        App.manager.registerWidget(object);
        object.move(window.innerWidth / 2 - object.getSize()["w"] / 2, window.innerHeight / 2 - object.getSize()["h"] / 2);
        App.manager.organize(object);
    };
    return MenuWidget;
}(Widget));
//# sourceMappingURL=MenuWidget.js.map
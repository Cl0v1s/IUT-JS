/// <reference path="MenuWidget.ts"/>
/// <reference path="WidgetManager.ts"/>

/**
 * Point d'entrée de l'application
 */
var App = (function () {

	/**
	 * Constructeur du point d'entré
	 * @param {[type]} Noeud servant de terrain de jeu pour les widgets
	 */
    function App(root) {
        App.manager = new WidgetManager(root);
        var menu = new MenuWidget(0, 0);
        App.manager.registerWidget(menu);
        App.manager.load();
    }
    return App;
}());

///Création et exécution du point d'entrée
window.onload = function () {
    var app = new App(document.getElementById("content"));
};
//# sourceMappingURL=app.js.map
/// <reference path="MenuWidget.ts"/>
/// <reference path="WidgetManager.ts"/>
var App = (function () {
    function App(root) {
        App.manager = new WidgetManager(root);
        var menu = new MenuWidget(0, 0);
        App.manager.registerWidget(menu);
    }
    return App;
}());
window.onload = function () {
    var app = new App(document.getElementById("content"));
};

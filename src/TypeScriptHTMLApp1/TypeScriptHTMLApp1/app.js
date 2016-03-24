var App = (function () {
    function App(root) {
        App.manager = new WidgetManager(root);
        var test = new SportWidget(300, 0);
        var test1 = new MeteoWidget(401, 0);
        var test2 = new MeteoWidget(501, 0);
        App.manager.registerWidget(test);
        App.manager.registerWidget(test1);
        App.manager.registerWidget(test2);
    }
    return App;
}());
window.onload = function () {
    var app = new App(document.getElementById("content"));
};
//# sourceMappingURL=app.js.map
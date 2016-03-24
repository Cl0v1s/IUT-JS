var App = (function () {
    function App(root) {
        this.manager = new WidgetManager(root);
        var test = new SportWidget(300, 0);
        var test1 = new MeteoWidget(401, 0);
        this.manager.registerWidget(test);
        this.manager.registerWidget(test1);
    }
    return App;
}());
window.onload = function () {
    var app = new App(document.getElementById("content"));
};
//# sourceMappingURL=app.js.map
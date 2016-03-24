var App = (function () {
    function App(root) {
        this.manager = new WidgetManager(root);
        var test = new SportWidget(300, 0);
        this.manager.registerWidget(test);
    }
    return App;
}());
window.onload = function () {
    var app = new App(document.getElementById("content"));
};
//# sourceMappingURL=app.js.map
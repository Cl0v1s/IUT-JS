class App {

    static manager: WidgetManager;

    constructor(root:HTMLElement) {
        App.manager = new WidgetManager(root);
        var test: Widget = new SportWidget(300, 0);
        var test1: Widget = new MeteoWidget(401, 0);
        var test2: Widget = new MeteoWidget(501, 0);


        App.manager.registerWidget(test);
        App.manager.registerWidget(test1);
        App.manager.registerWidget(test2);

    }

}

window.onload = function () {
    var app : App = new App(document.getElementById("content"));
};
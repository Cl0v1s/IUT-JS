/// <reference path="MenuWidget.ts"/>
/// <reference path="WidgetManager.ts"/>


class App {

    static manager: WidgetManager;

    constructor(root:HTMLElement) {
        App.manager = new WidgetManager(root);
        var menu: Widget = new MenuWidget(0, 0);


        App.manager.registerWidget(menu);

    }

}

window.onload = function () {
    var app : App = new App(document.getElementById("content"));
};
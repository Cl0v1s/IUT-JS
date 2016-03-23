var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DateWidget = (function (_super) {
    __extends(DateWidget, _super);
    function DateWidget() {
        _super.apply(this, arguments);
    }
    DateWidget.prototype.onCreate = function () {
        this.width = 250;
        this.height = 110;
        var date = new Date();
        this.div.innerHTML = "\
        <h1>Date et Heure</h1>\
        <div class='codehilite'>\
            <span>Nous sommes le <span class='k'>" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "</span></span><br>\
            <span>Il est <span class='k'>" + date.getHours() + "h" + date.getMinutes() + "min</span></span>\
        </div>\
        ";
        _super.prototype.onCreate.call(this);
    };
    return DateWidget;
}(Widget));
;
//# sourceMappingURL=DateWidget.js.map
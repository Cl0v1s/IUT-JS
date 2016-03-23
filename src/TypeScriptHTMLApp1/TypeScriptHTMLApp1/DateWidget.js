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
        var _this = this;
        this.width = 250;
        this.height = 110;
        this.name = "Date et Heure";
        this.showContent(this);
        this.timer = setInterval(function () { _this.showContent(_this); }, 5000);
        _super.prototype.onCreate.call(this);
    };
    DateWidget.prototype.showContent = function (self) {
        console.log("updating...");
        var date = new Date();
        self.content.innerHTML = "\
            <span>Nous sommes le <span class='k'>" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "</span></span><br>\
            <span>Il est <span class='k'>" + date.getHours() + "h" + date.getMinutes() + "min</span></span>\
        ";
    };
    DateWidget.prototype.onDelete = function () {
        clearInterval(this.timer);
    };
    return DateWidget;
}(Widget));
;
//# sourceMappingURL=DateWidget.js.map
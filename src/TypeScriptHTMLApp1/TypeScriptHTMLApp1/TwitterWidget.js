var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TwitterWidget = (function (_super) {
    __extends(TwitterWidget, _super);
    function TwitterWidget() {
        _super.apply(this, arguments);
    }
    TwitterWidget.prototype.onCreate = function () {
        this.name = "Twitter";
        this.width = 250;
        this.height = 400;
        this.showContent();
        _super.prototype.onCreate.call(this);
    };
    TwitterWidget.prototype.showContent = function () {
        var content = document.createElement("div");
        content.innerHTML = '<a class="twitter-timeline"  href="https://twitter.com/MichelBillaud" data-widget-id="712767314249261056">Tweets de @MichelBillaud</a><script></script>';
        this.setContent(content);
        eval('!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ?\'http\' : \'https\'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p +"://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } } (document, "script", "twitter-wjs");');
    };
    return TwitterWidget;
}(Widget));

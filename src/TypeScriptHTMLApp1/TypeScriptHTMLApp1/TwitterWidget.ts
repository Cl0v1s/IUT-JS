class TwitterWidget extends Widget {


    onCreate(): void {
        this.name = "Twitter";
        this.width = 250;
        this.height = 400;
        this.showContent();
        super.onCreate();
    }

    showContent(): void {
        var content = document.createElement("div");
        content.innerHTML = '<a class="twitter-timeline"  href="https://twitter.com/MichelBillaud" data-widget-id="712767314249261056">Tweets de @MichelBillaud</a><script></script>';
        this.setContent(content);
        eval('!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ?\'http\' : \'https\'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p +"://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } } (document, "script", "twitter-wjs");');
    }
}
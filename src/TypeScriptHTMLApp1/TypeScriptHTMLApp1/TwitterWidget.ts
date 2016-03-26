/// <reference path="twitter.d.ts" />

class TwitterWidget extends Widget {

    loaded: boolean;

    onCreate(): void {
        this.name = "Twitter";
        this.width = 250;
        this.height = 400;
        this.showContent();
        this.loaded = false;
        super.onCreate();
    }

    showContent(): void {
        var content = document.createElement("div");
        content.innerHTML = '<a class="twitter-timeline"  href="https://twitter.com/MichelBillaud" data-widget-id="712767314249261056">Tweets de @MichelBillaud</a><script>!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ?\'http\' : \'https\'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p +"://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } } (document, "script", "twitter-wjs");</script>';
        this.setContent(content);
    }

    onUpdate(): void {
        if (this.loaded == false) {
            this.div.innerHTML = "";
            var title: HTMLElement = document.createElement("h1");
            title.innerHTML = this.name;
            if (this.fixed == false) {

                var close: HTMLButtonElement = document.createElement("button");
                close.innerHTML = "X";
                close.classList.add("close");
                close.onclick = () => {
                    this.closeWidget();
                };
                title.appendChild(close);
            }
            this.div.appendChild(title);
            if (this.content.dataset["state"] != "no-update")
                this.div.appendChild(this.content);
            console.log("updating twitter");
            this.loaded = true;
        }


        this.div.style.position = "absolute";
        this.div.style.top = this.y.toString() + "px";
        this.div.style.left = this.x.toString() + "px";
        this.div.style.width = this.width.toString() + "px";
        this.div.style.height = this.height.toString() + "px";
        twttr.widgets.load();

    }
        


}
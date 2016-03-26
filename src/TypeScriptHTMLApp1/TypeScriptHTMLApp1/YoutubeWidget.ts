/// <reference path="widget.ts"/>


class YoutubeWidget extends Widget {

    onCreate(): void {
        this.name = "Youtube";
        this.width = 350;
        this.height = 70;
        if(!this.load())
            this.showForm();
        super.onCreate();
    }

    showForm(): void {
        this.setSize(350, 70);
        var content: HTMLDivElement = document.createElement("div");
        content.innerHTML = "<input type='text' placeholder='Entrez un mot-clef'>";
        var button: HTMLButtonElement = document.createElement("button");
        button.innerHTML = "Envoyer";
        button.addEventListener("click", () => {
            this.handleForm();
        });
        content.appendChild(button);
        this.setContent(content);
    }

    handleForm(): void {
        var search: string = ((<HTMLInputElement>this.content.getElementsByTagName("input")[0]).value);
        if (search == "")
            return;
        this.save(search);
        this.getData(search);
    }

    save(video : any): void {
        localStorage.setItem("YoutubeWidget", JSON.stringify(video));
    }

    load(): boolean {
        if (localStorage.getItem("YoutubeWidget") == null || localStorage.getItem("YoutubeWidget") == undefined) {
            return false;
        }
        this.showVideo(JSON.parse(localStorage.getItem("YoutubeWidget")));
        return true;
    }

    getData(query: string): void {
        Ajax.Get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyDuDkVffqwVK11LhxZ7iWMYPcsZfIwJuGs&part=snippet&q=" + query, null, (data: string) => {
            this.handleResult(this, data);
        });
    }

    handleResult(self: YoutubeWidget, data: string): void {
        var result : any = JSON.parse(data);
        if (result == undefined || result.items == undefined) {
            alert("Une erreur est survenue lors du traitement de la requete.");
            return;
        }
        var video: any = result.items[Math.floor(Math.random() * result.items.length)];
        var counter: number = 0;
        while ((video == undefined || video.id == undefined || video.id.kind.indexOf("video") == -1) && counter < 50) {
            video = result.items[Math.floor(Math.random() * result.items.length)];
            counter++;
        }
        if (counter >= 50) {
            alert("Aucune video trouvee.");
            return;
        }

        this.showVideo(video);
    }

    onStartMoving() : void
    {
        if(this.content.dataset["state"] != "no-update")
            this.div.removeChild(this.content);
        this.content.dataset["state"] = "no-update";
    }

    onStopMoving() : void
    {
        if (this.content.dataset["state"] == "no-update")
            this.div.appendChild(this.content);
        this.content.dataset["state"] = undefined;

    }

    showVideo(video: any): void {
        this.save(video);
        this.setSize(350, 380);
        var link: string = video.id.videoId;
        var content: HTMLDivElement = document.createElement("div");
        content.style.textAlign = "center";
        content.innerHTML = "<iframe width='350' height='315' src = 'http://www.youtube.com/embed/" + link + "?autoplay=1' style='border:0px;'></iframe>";
        var button: HTMLButtonElement = document.createElement("button");
        button.innerHTML = "Retour";
        button.addEventListener("click", () => {
            this.showForm();
        });
        content.appendChild(button);
        this.setContent(content);
    }
}
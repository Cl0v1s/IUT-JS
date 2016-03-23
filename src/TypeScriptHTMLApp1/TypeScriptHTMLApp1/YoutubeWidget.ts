class YoutubeWidget extends Widget {

    onCreate(): void {
        this.name = "Youtube";
        this.width = 350;
        this.height = 70;
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
        Ajax.Get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyDuDkVffqwVK11LhxZ7iWMYPcsZfIwJuGs&part=snippet&q=" + search, null, (data: string) => {
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
            console.log(video.id.kind);
            video = result.items[Math.floor(Math.random() * result.items.length)];
            counter++;
        }
        if (counter >= 50) {
            alert("Aucune video trouvee.");
            return;
        }

        this.showVideo(video);
    }

    showVideo(video: any): void {
        console.log(video);
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
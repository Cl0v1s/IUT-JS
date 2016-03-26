class MapsWidget extends Widget {

    onCreate(): void {
        this.width = 350;
        this.height = 70;
        this.name = "Maps";
        if(!this.load())
            this.showForm();
        super.onCreate();
    }

    showForm(): void {
        this.setSize(350, 70);
        var div: HTMLDivElement = document.createElement("div");
        div.innerHTML = "<input type='text' placeholder='Entrez une ville...'>";
        var button: HTMLButtonElement = document.createElement("button");
        button.innerHTML = "Envoyer";
        button.addEventListener("click", () => {
            this.handleForm();
        });
        div.appendChild(button);
        this.setContent(div);
    }

    handleForm(): void {
        var search: string = (<HTMLInputElement>this.content.getElementsByTagName("input")[0]).value;
        if (search == "")
            return;
        this.save(search);
        this.showMap(search);
    }

    load(): boolean {
        if (localStorage.getItem("MapsWidget") == null || localStorage.getItem("MapsWidget") == undefined) {
            return false;
        }
        this.showMap(localStorage.getItem("MapsWidget"));
        return true;
    }

    save(query: string): void {
        localStorage.setItem("MapsWidget", query);
    }

    showMap(data: string): void {
        this.setSize(350, 390);
        var div: HTMLDivElement = document.createElement("div");
        div.style.textAlign = "center";
        div.innerHTML = '<iframe width="325" height="325" frameborder="0" style="border: 0" src = "https://www.google.com/maps/embed/v1/place?q='+data+'&key=AIzaSyDuDkVffqwVK11LhxZ7iWMYPcsZfIwJuGs" allowfullscreen> </iframe>';
        var button: HTMLButtonElement = document.createElement("button");
        button.innerHTML = "Retour";
        button.addEventListener("click", () => {
            this.showForm();
        });
        div.appendChild(button);
        this.setContent(div);
    }

    onStartMoving(): void {
        if (this.content.dataset["state"] != "no-update")
            this.div.removeChild(this.content);
        this.content.dataset["state"] = "no-update";
    }

    onStopMoving(): void {
        if (this.content.dataset["state"] == "no-update")
            this.div.appendChild(this.content);
        this.content.dataset["state"] = undefined;

    }

}
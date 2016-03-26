/// <reference path="widget.ts"/>
/// <reference path="Ajax.ts"/>

class MeteoWidget extends Widget {


    onCreate() : void
    {
        this.name = "Meteo";
        this.width = 350;
        this.height = 70;
        if (!this.load())
            this.showForm();
        super.onCreate();
    }

    showForm(): void {
        this.setSize(350, 70);
        var div: HTMLDivElement = document.createElement("div");
        div.innerHTML = "<input type='text' placeholder='Nom de la ville...'>";
        var sub: HTMLButtonElement = document.createElement("button");
        sub.innerHTML = "Rechercher";
        sub.addEventListener("click", () => { this.formClick(); });
        div.appendChild(sub);
        this.setContent(div);
    }

    formClick(): void {

        var city: string;
        var input: HTMLInputElement = <HTMLInputElement>this.content.getElementsByTagName("input")[0];
        city = input.value;
        if (city == "")
            return;
        this.getData(city);
    }

    load(): boolean {
        if (localStorage.getItem("MeteoWidget") == null || localStorage.getItem("MeteoWidget") == undefined) {
            return false;
        }
        this.getData(localStorage.getItem("MeteoWidget"));
        return true;
    }

    save(query: string): void {
        localStorage.setItem("MeteoWidget", query);
    }

    getData(query: string): void {
        Ajax.Get("http://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=b19cfe2f2d3dc28a55fb7261fe36827a", undefined, (res: string) => {
            this.handleData(res);
        });
    }

    handleData(res: string): void {
        var data: any = JSON.parse(res);
        if(data.weather == undefined)
        {
            alert('Impossible de trouver le lieu demande');
            return;
        }
        this.setSize(350, 250);
        var div: HTMLElement = document.createElement("div");
        div.innerHTML = "\
                <center><img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'></center>\
                Lieu: <span class='k'>"+data.name+"</span><br>\
                C°: <span class='k'>"+ data.main.temp + "</span><br>\
                Humidité: <span class='k'>"+ data.main.humidity + "</span><br>\
                Description: <span class='k'>"+ data.weather[0].description + "</span><br><br>\
            ";
        this.save(data.name);
        var back = document.createElement("button");
        back.innerHTML = "Retour";
        back.addEventListener("click", () => { this.showForm() });
        back.style.width = "100px";
        back.style.display = "block";
        back.style.marginLeft = "auto";
        back.style.marginRight = "auto";

        div.appendChild(back);

        this.setContent(div);
    }
} 
/// <reference path="widget.ts"/>
/// <reference path="Ajax.ts"/>

class MeteoWidget extends Widget {


    onCreate() : void
    {
        this.name = "Meteo";
        this.width = 250;
        this.height = 70;
        this.showForm();
        super.onCreate();
    }

    showForm(): void {
        this.setSize(250, 70);
        var div: HTMLDivElement = document.createElement("div");
        div.innerHTML = "<input type='text' placeholder='Nom de la ville...'>";
        var sub: HTMLButtonElement = document.createElement("button");
        sub.innerHTML = "Rechercher";
        sub.addEventListener("click", () => { this.formClick(this); });
        div.appendChild(sub);
        this.setContent(div);
    }

    formClick(self : MeteoWidget): void {

        var city: string;
        var input: HTMLInputElement = <HTMLInputElement>this.content.getElementsByTagName("input")[0];
        city = input.value;
        Ajax.Get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=b19cfe2f2d3dc28a55fb7261fe36827a", undefined, (res:string) => {
            this.handleData(res);
        });
        
    }

    handleData(res: string): void {
        this.setSize(250, 160);
        var data: any = JSON.parse(res);
        var div: HTMLElement = document.createElement("div");
        div.innerHTML = "\
                C°: <span class='k'>"+ data.main.temp + "</span><br>\
                Humidité: <span class='k'>"+ data.main.humidity + "</span><br>\
                Description: <span class='k'>"+ data.weather[0].description + "</span><br><br>\
            ";
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
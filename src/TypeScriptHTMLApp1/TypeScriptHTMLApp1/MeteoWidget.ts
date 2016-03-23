/// <reference path="widget.ts"/>
/// <reference path="Ajax.ts"/>

class MeteoWidget extends Widget {


    onCreate() : void
    {
        this.name = "widget-meteo";
        this.width = 300;
        this.height = 200;
        this.div.innerHTML = "<h1>Meteo</h1>";
        var div: HTMLDivElement = document.createElement("div");
        div.classList.add("codehilite");
        div.id = "form";
        div.innerHTML = "<input type='text' id='widget-meteo-name' placeholder='Nom de la ville...'>";
        var sub: HTMLButtonElement = document.createElement("button");
        sub.innerHTML = "Rechercher";
        sub.addEventListener("click", this.formClick);
        div.appendChild(sub);
        this.div.appendChild(div);

        super.onCreate();
    }

    formClick(): void {

        var city: string;
        var input: HTMLInputElement = <HTMLInputElement>document.getElementById("widget-meteo-name");
        city = input.value;
        Ajax.Get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=b19cfe2f2d3dc28a55fb7261fe36827a", undefined, function(res)
        {
            var data: any = JSON.parse(res);
            var div: HTMLElement = document.createElement("div");
            div.classList.add("codehilite");
            div.innerHTML = "\
                C°: <span class='k'>"+ data.main.temp + "</span><br>\
                Humidité: <span class='k'>"+ data.main.humidity + "</span><br>\
                Descriptio: <span class='k'>"+data.weather[0].description+"</span>\
            ";
            var parent = document.getElementById("widget-meteo");
            if (parent != undefined) {
                parent.innerHTML = "<h1>Meteo</h1>";
                parent.appendChild(div);
            }
        });
        
    }
} 
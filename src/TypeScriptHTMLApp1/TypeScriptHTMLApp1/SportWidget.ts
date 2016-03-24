class SportWidget extends Widget {


    onCreate(): void {
        this.width = 350;
        this.height = 170;
        this.name = "Sport - Bayern de Munich";
        this.showContent();
        super.onCreate();
    }

    showContent(): void {
        
        var headers = {};
        headers["X-Auth-Token"] = "67d369040a2c457ca9b312adad4e11c0";
        Ajax.Get("http://api.football-data.org/v1/teams/5", null, (data: string) => {
            this.handleContent(data);
        },undefined, headers);
    }

    handleContent(data: string): void {
        var result: any = JSON.parse(data);
        if (result == undefined)
            return;
        else
            this.showTeam(result);
    }

    showTeam(data: any): void {
        var div: HTMLDivElement = document.createElement("div");
        div.style.textAlign = "center";
        div.innerHTML = "\
        <img src='"+ data.crestUrl+"' width=50 height=50><br>\
        <strong>Nom:</strong> "+ data.name + "<br>\
        <strong>Code:</strong> "+ data.code + "<br>\
        <strong>Valeur:</strong> "+ data.squadMarketValue + "<br>\
        ";
        this.setContent(div);
    }

}
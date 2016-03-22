class DateWidget extends Widget
{
    onCreate(): void {
        this.width = 250;
        this.height = 110;
        var date: Date = new Date();
        this.div.innerHTML = "\
        <h1>Date et Heure</h1>\
        <div class='codehilite'>\
            <span>Nous sommes le <span class='k'>"+ date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "</span></span><br>\
            <span>Il est <span class='k'>"+date.getHours() + "h"+date.getMinutes()+"min</span></span>\
        </div>\
        ";
        super.onCreate();
    }
}; 
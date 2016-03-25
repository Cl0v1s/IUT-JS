class DateWidget extends Widget
{

    timer: any;

    onCreate(): void {
        this.width = 250;
        this.height = 110;
        this.name = "Date et Heure";
        this.showContent(this);
        this.timer = setInterval(() => { this.showContent(this); }, 5000);
        super.onCreate();
    }

    showContent(self: DateWidget): void {
        console.log("updating...");
        var date: Date = new Date();
        self.content.innerHTML = "\
            <span>Nous sommes le <span class='k'>"+ date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "</span></span><br>\
            <span>Il est <span class='k'>"+ date.getHours() + "h" + date.getMinutes() + "min</span></span>\
        ";
    }

    onDelete(): void {
        clearInterval(this.timer);
        super.onDelete();
    }
}; 
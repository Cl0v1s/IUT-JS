class MenuWidget extends Widget {

    onCreate(): void {
        this.width = window.innerWidth;
        this.height = 70;
        this.fixed = true;
        this.div.style.zIndex = "200";
        this.name = "Menu";
        window.onresize = () => {
            this.updateSize();
        };
        this.showForm();
        super.onCreate();
    }

    updateSize(): void {
        this.width = window.innerWidth;
        this.onUpdate();
    }

    showForm(): void {
        var div: HTMLDivElement = document.createElement("div");
        var select: HTMLSelectElement = document.createElement("select");
        for (var i = 0; i != WidgetManager.Widgets.length; i++) {
            var option: HTMLOptionElement = document.createElement("option");
            var temp = new WidgetManager.Widgets[i](0, 0);
            option.innerHTML = temp.name;
            temp.onDelete();
            option.value = i.toString();
            option.dataset["object"] = i.toString();
            select.appendChild(option);
        }
        div.appendChild(select);
        var button: HTMLButtonElement = document.createElement("button");
        button.innerHTML = "Ajouter";
        button.onclick = () => {
            this.handleForm();
        };
        div.appendChild(button);
        this.setContent(div);
    }

    handleForm(): void {
        var index: string = (<HTMLSelectElement>this.content.getElementsByTagName("select")[0]).value;
        if (App.manager.exists(WidgetManager.Widgets[index]))
            return;
        var object : Widget = new WidgetManager.Widgets[index](0, 0);

        App.manager.registerWidget(object);
        object.move(window.innerWidth / 2 - object.getSize()["w"] / 2, window.innerHeight / 2 - object.getSize()["h"] / 2);

        App.manager.organize(object);

    }



}
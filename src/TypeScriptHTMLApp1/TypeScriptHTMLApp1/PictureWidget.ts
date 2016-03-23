/// <reference path="widget.ts"/>

class PictureWidget extends Widget
{
	onCreeate() : void
	{
		this.width = 250;
		this.height = 250;
		this.name = "widget-picture";
		//Ajout du titre
		this.div.innerHTML = "<h1>Photo</h1>";
		//ajout du contenu
		var content : HTMLDivElement = document.createElement("div");
		content.classList.add("codehilite");
		content.innerHTML = "<input name='widget-picture-search' type='text' placeholder='Entrez un mot-clef'>";
		var button: HTMLButtonElement = document.createElement("button");
		button.innerText = "Chercher";
		var self = this;
		button.addEventListener('click', function(){
			self.formClick();
		};
		content.appendChild(button);
		this.div.appendChild(content);

		super.onCreate();
	}

	formClick() : void
	{
		console.log(this);
		var search: string = (<HTMLButtonElement>document.getElementById("widget-picture-search")).value;
		//rechercher l'api
	}	

}
# IUT - JS 

## Informations à l'intention du correcteur

Ce projet a été réalisé à l'aide de [TypeScript](http://www.typescriptlang.org/).  
Les sources Javascript commentées sont disponibles dans le dossier "build" situé à la racine du répertoire.   
Le test peut être exécuté en ouvrant le fichier index.html à l'aide d'un navigateur supportant HTML5 et respectant les normes W3C.  
Les sources Typescript sont disponibles dans le dossier "src" situé à la racine du répertoire, au sein d'une solution Visual Studio.  


## Introduction 

iGoogle était un service gratuit lancé par la société américaine Google en mai 2005. Il s’agissait d’un portail Web personnalisable permettant d’agréger en une seule page des ﬂux d’information continue (notamment des ﬂux RSS), des jeux, des services personnalisés (Agenda, météo, Gmail...) et différents modules de type widget. Le 3 juillet 2012, Google annonce que le retrait du service pour le 1er novembre 2013, renvoyant les utilisateurs vers Google Play et le Chrome Web Store21. Ce mini projet ambitionne de faire (un peu) revivre IGoogle. Ci-dessous sont décrits les besoins fonctionnels et l’ergonomie souhaitée. Nous vous donnons également des liens vers des webservices donnant accès à des informations en temps réel. En termes de technologie de développement vous pouvez utiliser n’importe quelle technologie/concept vue lors des cours de WEB en S3 et S4. Pour la partie ergonomie, vous êtes vivement encouragés à utiliser des framework CSS ( bootstrap2, Foundation3, KNACSS4, ... )

Ce projet a été réalisé à l'aide de [TypeScript](http://www.typescriptlang.org/).

## Fonctionnalités implémentées

 * Il faut que l’utilisateur puisse ajouter autant de widgets qu’il le souhaite ä L’utilisateur peu ajouter un widget parmi un ensemble de widget prédéﬁnis 
 * L’utilisateur doit pouvoir supprimer un widget Vous devez (au minimum) intégrer les widgets décrits ci-dessous : 
    * Heure / Date. Le widget n’est pas paramétrable et afﬁche par défaut l’heure et la date locale 
    * Météo : widget paramétrable. L’utilisateur doit pouvoir saisir la ville dont il veut connaitre la météo (par exemple la température). 
    * Photos : widget paramétrable : L’utilisateur doit pouvoir saisir un mot-clef et que cela afﬁche 1 image correspondant à ce mot-clef. 
    * Twitter : afﬁcher la timeLine du compte @MichelBillaud . 
    * Youtube : afﬁcher une vidéo. L’utilisateur doit pouvoir saisir un mot-clef et que cela permette de visionner la vidéo correspondante 
    * Google maps : l’utilisateur doit pouvoir saisir une ville et que cela afﬁche une carte google avec le chemin le menant vers le département informatique de l’IUT 
    * Infos sportives : afﬁche les derniers résultats (ou ce que vous voulez) du club de Foot "Bayern de Munich". 
 * A chaque rafraîchissement de la page tous les widgets sont mis à jour. L’heure doit être mise à jour sans avoir à rafraîchir la page.
 * Tous les widgets sont rectangulaires et doivent pouvoir être échangés les uns à la place des autres (surlemode du drag and drop)
 * Faire la partie serveur permettant de sauvegarder les données de la personne (après connection) -> Utilisation de LocalStorage

## Reste à faire (RAF)

 * Le widget Twitter doit être paramétrable (plus compliqué car nécessite de regarder comment fonctionne OAuth et de faire du php). 


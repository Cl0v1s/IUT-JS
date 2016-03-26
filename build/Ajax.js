
/**
 * Ajax
 * Classe permettant de faire des appels de ressources externes
 */
var Ajax = (function () {
    function Ajax() {
    }


    /**
     * Get
     * Permet de faire des appels Ajax get
     * @param {[type]} ressource à atteindre
     * @param {[type]} données à envoyer
     * @param {Function} fonction appelée lors de la réussite de la requète, doit attendre un string
     * @param {[type]} fonction appelée lors de l'échec de la requète, doit attendre un string
     * @param {[type]} header optionnels pour la requète
     */
    Ajax.Get = function (url, data, callback, error, header) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    callback(xhr.responseText);
                }
                else {
                    if (error != undefined && error != null)
                        error(xhr.statusText);
                    else
                        console.log(xhr);
                }
            }
        };
        xhr.open('GET', url);
        if (header != undefined) {
            for (var key in header) {
                xhr.setRequestHeader(key, header[key]);
            }
        }
        if (data != undefined && data != null)
            xhr.send(JSON.stringify(data));
        else
            xhr.send();
    };

    /**
     * Post
     * Permet de faire des appels Ajax post
     * @param {[type]} ressource à atteindre
     * @param {[type]} données à envoyer
     * @param {Function} fonction appelée lors de la réussite de la requète, doit attendre un string
     * @param {[type]} fonction appelée lors de l'échec de la requète, doit attendre un string
     */
    Ajax.Post = function (url, data, callback, error) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK)
                    callback(xhr.responseText);
            }
            else {
                error(xhr.statusText);
            }
        };
        xhr.open('POST', url);
        if (data != undefined && data != null)
            xhr.send(JSON.stringify(data));
        else
            xhr.send();
    };
    return Ajax;
}());
//# sourceMappingURL=Ajax.js.map
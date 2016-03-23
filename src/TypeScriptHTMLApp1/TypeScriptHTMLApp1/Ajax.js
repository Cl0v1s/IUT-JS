var Ajax = (function () {
    function Ajax() {
    }
    Ajax.Get = function (url, data, callback, error) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    callback(xhr.responseText);
                }
                else {
                    if (callback != undefined && callback != null)
                        error(xhr.statusText);
                }
            }
        };
        xhr.open('GET', url);
        if (data != undefined && data != null)
            xhr.send(JSON.stringify(data));
        else
            xhr.send();
    };
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

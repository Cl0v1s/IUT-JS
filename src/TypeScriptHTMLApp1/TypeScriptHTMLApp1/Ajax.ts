class Ajax {
    static Get(url:string, data?:JSON, callback?:Function, error?:Function, header?:any): void {
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
        }
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

    }

    static Post(url: string, data?: JSON, callback?: Function, error?: Function): void {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK)
                    callback(xhr.responseText);
            } else {
                error(xhr.statusText);
            }
        }

        xhr.open('POST', url);
        if (data != undefined && data != null)
            xhr.send(JSON.stringify(data));
        else
            xhr.send();
    }
} 
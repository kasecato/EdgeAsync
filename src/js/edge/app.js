// ES7 code, with async/await
function httpGet(url) {
    return new Promise(function (resolve, reject) {
        // do the usual Http request
        let request = new XMLHttpRequest();
        request.open('GET', url);

        request.onload = function () {
            if (request.status == 200) {
                resolve(request.response);
            } else {
                reject(Error(request.statusText));
            }
        };

        request.onerror = function () {
            reject(Error('Network Error'));
        };

        request.send();
    });
}

async function httpGetSvg(url) {
    // check if the URL looks like a SVG file and call httpGet.
    let regex = /\.(svg)$/i;

    if (regex.test(url)) {
        // call the async function, wait for the result
        return await httpGet(url);
    } else {
        throw Error('Bad Url Format');
    }
}

async function httpGetJson(url) {
    // check if the URL looks like a JSON file and call httpGet.
    let regex = /\.(json)$/i;

    if (regex.test(url)) {
        // call the async function, wait for the result
        return await httpGet(url);
    } else {
        throw Error('Bad Url Format');
    }
}


window.onload = function () {

    const SVG_FILE = 'data/lena.svg';
    const JSON_FILE = 'data/bigdata.json';

    let logger = (/* String */ log) => {
        let date = new Date();
        let logElem = document.getElementById('log');
        logElem.value += date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + ': ' + log + '\r\n';
    };

    /*-----------------------------------------------------------------------*\
     * Async
    \*-----------------------------------------------------------------------*/
    let async = document.getElementById('edgeAsync');
    async.onclick = async () => {

        /* SVG */
        logger('[START] Edge Async SVG');
        let responseSvg = await httpGetSvg(SVG_FILE);
        logger('[END] Edge Async SVG');

        let svg = document.getElementById('svg');
        svg.innerHTML = responseSvg;


        /* JSON */
        logger('[START] Edge Async JSON');
        let responseJson = await httpGetJson(JSON_FILE);
        logger('[END] Edge Async JSON');

        let json = document.getElementById('json');
        json.innerText = responseJson;
    };

    /*-----------------------------------------------------------------------*\
     * Sync
    \*-----------------------------------------------------------------------*/
    let sync = document.getElementById('edgeSync');
    sync.onclick = () => {

        /* SVG */
        logger('[START] Edge Sync SVG');
        httpGetSvg(SVG_FILE).then(function (responseSvg) {
            logger('[END] Edge Sync SVG');

            let svg = document.getElementById('svg');
            svg.innerHTML = responseSvg;
        }).catch(function (error) {
            logger(error);
        });


        /* JSON */
        logger('[START] Edge Sync JSON');
        httpGetJson(JSON_FILE).then(function (responseJson) {
            logger('[END] Edge Sync JSON');

            let json = document.getElementById('json');
            json.innerText = responseJson;
        }).catch(function (error) {
            logger(error);
        });;

    };
}

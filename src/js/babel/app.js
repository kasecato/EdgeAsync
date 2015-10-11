// ES7 code, with async/await
async function xhrBabelAsync(/* String */ url) {
    let request = new XMLHttpRequest();
    await request.open('GET', url, false);
    await request.send();
    if (request.status == 200) {
        return request.responseText;
    } else {
        throw Error(request.statusText);
    }
}

window.addEventListener("load", function() {

    const SVG_FILE = 'data/lena.svg';
    const JSON_FILE = 'data/bigdata.json';

    const svg = document.getElementById('svg');
    const json = document.getElementById('json');
    const log = document.getElementById('log');

    const logger = (/* String */ mess) => {
        let date = new Date();
        log.value += '[BABEL]\t' + date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + ': ' + mess + '\r\n';
        log.scrollTop = log.scrollHeight;
    };

    /*-----------------------------------------------------------------------*\
     * Async
    \*-----------------------------------------------------------------------*/
    const babelAsync = document.getElementById('babelAsync');
    babelAsync.onclick = async () => {

        // clear
        svg.innerHTML = '';
        json.innerText = '';

        /* SVG */
        logger('[START] Async SVG');
        try {
            const responseSvg = await xhrBabelAsync(SVG_FILE);
            logger('[END] Async SVG');

            svg.innerHTML = responseSvg;
        } catch (e) {
            logger('[END] Async SVG Error ' + e);
        }


        /* JSON */
        logger('[START] Async JSON');
        try {
            const responseJson = await xhrBabelAsync(JSON_FILE);
            logger('[END] Async JSON');

            json.innerText = responseJson;
        } catch (e) {
            logger('[END] Async SVG Error ' + e);
        }
    };

    /*-----------------------------------------------------------------------*\
     * Sync
    \*-----------------------------------------------------------------------*/
    const babelSync = document.getElementById('babelSync');
    babelSync.onclick = () => {

        // clear
        svg.innerHTML = '';
        json.innerText = '';

        /* SVG */
        logger('[START] Sync SVG');
        xhrBabelAsync(SVG_FILE).then(function (responseSvg) {
            logger('[END] Sync SVG');

            svg.innerHTML = responseSvg;
        }).catch(function (error) {
            logger(error);
        });


        /* JSON */
        logger('[START] Sync JSON');
        xhrBabelAsync(JSON_FILE).then(function (responseJson) {
            logger('[END] Sync JSON');

            json.innerText = responseJson;
        }).catch(function (error) {
            logger(error);
        });

    };

}, false);

// ES7 code, with async/await
async function xhrEdgeAsync(/* String */ url) {
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
        log.value += '[EDGE]\t' + date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + ': ' + mess + '\r\n';
        log.scrollTop = log.scrollHeight;
    };

    /*-----------------------------------------------------------------------*\
     * Async
    \*-----------------------------------------------------------------------*/
    const edgeAsync = document.getElementById('edgeAsync');
    edgeAsync.onclick = async () => {

        // clear
        svg.innerHTML = '';
        json.innerText = '';

        /* SVG */
        logger('[START] Async SVG');
        try {
            const responseSvg = await xhrEdgeAsync(SVG_FILE);
            logger('[END] Async SVG');

            svg.innerHTML = responseSvg;
        } catch (e) {
            logger('[END] Async SVG Error ' + e);
        }


        /* JSON */
        logger('[START] Async JSON');
        try {
            const responseJson = await xhrEdgeAsync(JSON_FILE);
            logger('[END] Async JSON');

            json.innerText = responseJson;
        } catch (e) {
            logger('[END] Async SVG Error ' + e);
        }
    };

    /*-----------------------------------------------------------------------*\
     * Sync
    \*-----------------------------------------------------------------------*/
    const edgeSync = document.getElementById('edgeSync');
    edgeSync.onclick = () => {

        // clear
        svg.innerHTML = '';
        json.innerText = '';

        /* SVG */
        logger('[START] Sync SVG');
        xhrEdgeAsync(SVG_FILE).then(function (responseSvg) {
            logger('[END] Sync SVG');

            svg.innerHTML = responseSvg;
        }).catch(function (error) {
            logger(error);
        });


        /* JSON */
        logger('[START] Sync JSON');
        xhrEdgeAsync(JSON_FILE).then(function (responseJson) {
            logger('[END] Sync JSON');

            json.innerText = responseJson;
        }).catch(function (error) {
            logger(error);
        });

    };

}, false);

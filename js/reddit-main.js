'use strict';

(() => {
    let $title = document.getElementsByTagName('title')[0];

    setInterval(() => {
        $title.innerHTML = 'Google';
    }, 100);
})();

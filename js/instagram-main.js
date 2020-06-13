'use strict';

(() => {
    document.addEventListener('contextmenu', function(e) {
        let image = e.srcElement.parentElement.querySelectorAll('img');
        if (image.length === 1) {
            e.preventDefault();

            window.open(image[0].src, '_blank');
        }
    });
})();

'use strict';

(() => {
    document.addEventListener('contextmenu', function(e) {
        let media = e.srcElement.parentElement.querySelectorAll('img, video');
        if (media.length === 1 || (media.length === 2 && (media[0].tagName === 'VIDEO' || media[1].tagName === 'VIDEO'))) {
            e.preventDefault();

            if (media.length === 1) {
                window.open(media[0].src, '_blank');
            } else {
                [].slice.call(media, 0).map(function (m) {
                    if (m.tagName === 'VIDEO') {
                        window.open(m.src, '_blank');
                    }
                });
            }
        }
    });
})();

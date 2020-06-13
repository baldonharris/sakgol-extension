'use strict';

(() => {
    Element.prototype.applyStyle = function (styles) {
        for (let styleIndex in styles) {
            if (styles.hasOwnProperty(styleIndex)) {
                this.style[styleIndex] = styles[styleIndex];
            }
        }

        return this;
    };

    Element.prototype.appendTo = function ($parent) {
        $parent.appendChild(this);

        return this;
    };

    Element.prototype.addMedia = function (media) {
        let $media = document.createElement('a');

        if (media.tagName === 'VIDEO') {
            $media.appendChild(media.cloneNode(true));
        } else {
            $media.applyStyle({backgroundImage: 'url(' + media.src + ')', backgroundSize: 'cover'})
        }

        $media.classList.add('img-to-display');
        $media.setAttribute('href', '#');
        $media
            .appendTo(this)
            .addEventListener('click', ev => {
                ev.preventDefault();

                window.open(media.src, '_blank');
                this.applyStyle({display: 'none'}).innerHTML = '';
            });

        return this;
    };

    Element.prototype.clear = function () {
        this.applyStyle({display: 'none'}).innerHTML = '';

        return this;
    };

    let $popup = document.createElement('div');
    $popup
        .appendTo(document.getElementsByTagName('body')[0])
        .setAttribute('id', 'ext-popup');

    document.addEventListener('click', function (e) {
        if (e.srcElement.closest('#ext-popup') === null) {
            $popup.clear();
        }
    });

    document.addEventListener('contextmenu', function(e) {
        if ($popup.style.display !== 'none') {
            $popup.clear();
        }

        let media = e.srcElement.parentElement.querySelectorAll('img, video');
        if (media.length === 1 || (media.length === 2 && (media[0].tagName === 'VIDEO' || media[1].tagName === 'VIDEO'))) {
            e.preventDefault();

            [].slice.call(document.querySelectorAll('img[srcset], video'), 0)
                .reverse()
                .slice(0, 8)
                .map(function (media) {
                    if (media.getAttribute('alt') !== 'Instagram') {
                        if (document.querySelector('body > #react-root > form') === null) {
                            $popup.addMedia(media);
                        } else {
                            if (!(media.closest('main') !== null && window.location.pathname.indexOf('/p/') !== -1)) {
                                $popup.addMedia(media);
                            }
                        }
                    }
                });

            $popup.applyStyle({display: 'block', top: e.clientY + 'px', left: e.clientX + 'px'});
        }
    });
})();

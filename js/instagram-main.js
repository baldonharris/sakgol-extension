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

    let $popup = document.createElement('div');
    $popup
        .appendTo(document.getElementsByTagName('body')[0])
        .setAttribute('id', 'ext-popup');

    document.addEventListener('click', function (e) {
        if (e.srcElement.closest('#ext-popup') === null) {
            $popup.applyStyle({display: 'none'}).innerHTML = '';
        }
    });

    document.addEventListener('contextmenu', function(e) {
        if (window.location.pathname.indexOf('/p/') !== -1) {
            e.preventDefault();

            if ($popup.style.display !== 'none') {
                $popup.applyStyle({display: 'none'}).innerHTML = '';
            }

            [].slice.call(document.querySelectorAll("img[alt*='Image may contain']"), 0)
                .reverse()
                .slice(0, 8)
                .map(function (image) {
                    let $image = document.createElement('a');

                    $image.classList.add('img-to-display');
                    $image.setAttribute('href', '#');
                    $image
                        .applyStyle({backgroundImage: 'url(' + image.src + ')', backgroundSize: 'cover'})
                        .appendTo($popup)
                        .addEventListener('click', function (ev) {
                            ev.preventDefault();

                            window.open(image.src, '_blank');
                            $popup.applyStyle({display: 'none'}).innerHTML = '';
                        });
                });

            $popup.applyStyle({display: 'block', top: e.clientY + 'px', left: e.clientX + 'px'});
        }
    });
})();

CB.Services.Animator = {
    fadeIn($el, params) {
        if (!$el.is(":visible")) {
            const animationDuration = params && _.isNumber(params.animationDuration) ? params.animationDuration : CB.animationDurations.medium;
            const alpha = params && _.isNumber(params.opacity) ? params.opacity : 1;

            TweenLite.set($el, {display: "block", alpha: 0});
            TweenLite.to($el, animationDuration, {
                alpha,
                onComplete() {
                    if (params && _.isFunction(params.onComplete)) {
                        params.onComplete();
                    }
                }
            });
        }
    },

    fadeOut($el, params) {
        if ($el.is(":visible")) {
            const animationDuration = params && _.isNumber(params.animationDuration) ? params.animationDuration : CB.animationDurations.medium;

            TweenLite.to($el, animationDuration, {
                alpha: 0,
                onComplete() {
                    $el.hide().css("opacity", 1);
                    if (params && _.isFunction(params.onComplete)) {
                        params.onComplete();
                    }
                }
            });
        }
    },

    enableLoading($el, text) {
        if ($el.prop("tagName") === "BUTTON") {
            const btn = $el.get(0);
            const defaultText = btn.innerHTML;
            const loadingText = text || defaultText;

            $el.data("defaultText", defaultText);
            $el.prop("disabled", true);

            btn.innerHTML = `<i class="fa fa-spinner fa-pulse"></i>${loadingText}`;
        }
    },

    disableLoading($el) {
        if ($el.prop("tagName") === "BUTTON") {
            $el.html($el.data("defaultText"));
            $el.prop("disabled", false);
        }
    },

    scrollTo(e, offsetCorrection) {
        e.preventDefault();

        const $target = $(e.currentTarget);
        const hash = $target.attr("href");
        const sectionId = hash.substring(1);
        const $section = $(document.getElementById(sectionId));

        const scrollYPos = $section.offset().top - offsetCorrection;

        TweenLite.to(window, 1, {
            scrollTo: {
                y: scrollYPos,
                autoKill: false  // To avoid bug https://greensock.com/forums/topic/15108-ios-10-scrolltoplugin
            },
            ease: Power4.easeOut
        });
    }
};

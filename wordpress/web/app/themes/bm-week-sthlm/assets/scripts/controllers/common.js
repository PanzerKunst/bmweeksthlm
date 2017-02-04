CB.Controllers.Common = {
    init() {
        CB.Services.Browser.addUserAgentAttributeToHtmlTag();
        CB.Services.Browser.fixFlexboxIndicatorClass();

        this._initElements();
        this._initEvents();
        this._removeEmptyParagraphTagsAddedByTheWpEditor();
        this._initPageBackgrounds();
    },

    _initElements() {
        this.$window = $(window);

        this.$siteHeader = $("#site-header");
        this.$siteMenu = $(".nav-primary");
        this.$scrollingAnchors = $("body").find("a[href^='#']");
        this.$pages = $("#all-pages-as-single").children();

        this.$tenPrinciplesShowBtn = $("#about-bm").find("button");

        this.$tenPrinciplesSection = $("#ten-principles");
        this.$tenPrinciplesHideBtn = this.$tenPrinciplesSection.find("button");
    },

    _initEvents() {
        this.$window.scroll(_.debounce(() => this._onScroll(), 15));

        this.$scrollingAnchors.click(e => CB.Services.Animator.scrollTo(e, this.$siteMenu.outerHeight()));

        this.$tenPrinciplesShowBtn.click(() => this._toggleTenPrinciplesSection());
        this.$tenPrinciplesHideBtn.click(() => this._toggleTenPrinciplesSection());
    },

    _removeEmptyParagraphTagsAddedByTheWpEditor() {
        $("p:empty").remove();
    },

    _onScroll() {
        const isScrolledDownEnough = this.$window.scrollTop() > 0;

        this.$siteHeader.toggleClass("scrolled-down", isScrolledDownEnough);
    },

    _initPageBackgrounds() {
        _.forEach(this.$pages, page => {
            const $page = $(page);
            const dataUrlBgImgLarge = $page.data("urlBgImgLarge");
            const dataUrlBgImgSmall = $page.data("urlBgImgSmall");

            if (!CB.Services.Browser.isLargeScreen()
                && !window.matchMedia("(min-resolution: 2dppx)").matches
                && dataUrlBgImgSmall) {

                $page.addClass("img-bg");
                $page.css("background-image", "url(" + dataUrlBgImgSmall + ")");
            } else if (dataUrlBgImgLarge) {
                $page.addClass("img-bg");
                $page.css("background-image", "url(" + dataUrlBgImgLarge + ")");
            }
        });
    },

    _toggleTenPrinciplesSection() {
        if (this.$tenPrinciplesSection.is(":visible")) {

            // We hide it because of a weird display bug
            this.$tenPrinciplesHideBtn.hide();

            TweenLite.to(this.$tenPrinciplesSection, CB.animationDurations.medium, {
                height: 0,
                onComplete: () => {
                    this.$tenPrinciplesSection.css({
                        display: "none",
                        height: "auto"
                    });

                    this.$tenPrinciplesHideBtn.show();
                }
            });

        } else {
            CB.Services.Animator.fadeIn(this.$tenPrinciplesSection);
        }
    }
};

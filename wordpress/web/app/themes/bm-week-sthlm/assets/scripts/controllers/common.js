CB.Controllers.Common = {
    init() {
        CB.Services.Browser.addUserAgentAttributeToHtmlTag();
        CB.Services.Browser.fixFlexboxIndicatorClass();

        this._initElements();
        this._initEvents();
        this._removeEmptyParagraphTagsAddedByTheWpEditor();
    },

    _initElements() {
        this.$window = $(window);

        this.$siteHeader = $("#site-header");
        this.$siteMenu = $(".nav-primary");
        this.$scrollingAnchors = $("body").find("a[href^='#']");
    },

    _initEvents() {
        this.$window.scroll(_.debounce(() => this._onScroll(), 15));
        this.$scrollingAnchors.click(e => CB.Services.Animator.scrollTo(e, this.$siteMenu.outerHeight()));
    },

    _removeEmptyParagraphTagsAddedByTheWpEditor() {
        $("p:empty").remove();
    },

    _onScroll() {
        const isScrolledDownEnough = this.$window.scrollTop() > 0;

        this.$siteHeader.toggleClass("scrolled-down", isScrolledDownEnough);
    }
};

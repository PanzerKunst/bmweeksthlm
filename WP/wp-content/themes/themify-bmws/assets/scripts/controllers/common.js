import Browser from "../services/browser";

const CommonController = {
    init() {
        Browser.addUserAgentAttributeToHtmlTag();
        Browser.fixFlexboxIndicatorClass();
    }
};

Object.create(CommonController).init();

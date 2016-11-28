const controller = {
    init() {
        ReactDOM.render(
            React.createElement(this.reactComponent),
            document.querySelector("[role=main]")
        );
    },

    reactComponent: React.createClass({
        render() {
            return (
                <div id="content">
                Hello React!
                </div>);
        },

        componentDidMount() {
            $(window).on("facebook:init", () => this._fbRequest());
        },

        _fbRequest() {

            // TODO
            FB.api(
                "/653056831543408?fields=cover,description,start_time,name,place", {
                    access_token: "1833011923649309|77M2J2UJc9sdgYZYnzE8xx15MAc"
                },
                function(response) {
                    if (response && !response.error) {
                        console.log("FB reponse", response);
                    }
                }
            );
        }
    })
};

controller.init();

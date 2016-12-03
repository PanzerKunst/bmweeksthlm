import store from "./store";

const controller = {
    init() {
        store.reactComponent = ReactDOM.render(
            React.createElement(this.reactComponent),
            document.querySelector("[role=main]")
        );

        store.init();
    },

    reactComponent: React.createClass({
        render() {
            return (
                <div ref="root" className="fb-events">
                    <div className="centered-contents">
                        <i className="fa fa-spinner fa-pulse" />
                    </div>
                    <div className="event-list-wrapper">
                        <ul className="styleless days">
                            {_.keys(store.fbEventData).map(eventYyyymmdd =>
                                <li key={eventYyyymmdd}>
                                    <h2>{moment(eventYyyymmdd).format("dddd DD")}</h2>

                                    <ul className="styleless day-events">
                                    {store.fbEventData[eventYyyymmdd].map(fbEvent => {
                                        const style = {backgroundImage: `url(${fbEvent.imgUrl})`};

                                        return (
                                            <li key={fbEvent.id}>
                                                <a href={`https://facebook.com/${fbEvent.id}`} target="_blank">
                                                    <div className="event-img" style={style} />
                                                    <h3>{fbEvent.name}</h3>
                                                    <section className="event-time-and-location">
                                                        <span className="event-time">{fbEvent.startMoment.format("HH:mm")}</span>
                                                        <span className="time-location-separator">|</span>
                                                        <span className="event-location">{fbEvent.location}</span>
                                                    </section>
                                                </a>
                                            </li>
                                        );
                                    })}
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>);
        },

        componentDidMount() {
            this._initElements();
        },

        componentDidUpdate() {
            if (!_.isEmpty(store.fbEventData)) {
                this.$loaderWrapper.hide();
            }
        },

        _initElements() {
            const $rootEl = $(ReactDOM.findDOMNode(this.refs.root));

            this.$loaderWrapper = $rootEl.children(".centered-contents");
        }
    })
};

controller.init();

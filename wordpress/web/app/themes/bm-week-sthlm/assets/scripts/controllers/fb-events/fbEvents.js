CB.Controllers.FbEvents = {};

CB.Controllers.FbEvents.controller = {
    init() {
        CB.Controllers.FbEvents.store.reactComponent = ReactDOM.render(
            React.createElement(this.reactComponent),
            document.querySelector("[role=main]")
        );

        CB.Controllers.FbEvents.store.init();
    },

    reactComponent: React.createClass({
        render() {
            return (
                <div ref="root">
                    <div className="centered-contents">
                        <i className="fa fa-spinner fa-pulse" />
                    </div>
                    <div className="event-list-wrapper">
                        <ul className="styleless days">
                            {_.keys(CB.Controllers.FbEvents.store.fbEventData).map(eventYyyymmdd =>
                                <li key={eventYyyymmdd}>
                                    <h3 className="event-date">
                                        <span className="weekday">{moment(eventYyyymmdd).format("dddd")}</span>
                                        <span className="weekday-month-separator">|</span>
                                        <span className="month">{moment(eventYyyymmdd).format("MMMM DD")}</span>
                                    </h3>

                                    <ul className="styleless day-events">
                                    {CB.Controllers.FbEvents.store.fbEventData[eventYyyymmdd].map(fbEvent => {
                                        const style = {backgroundImage: `url(${fbEvent.imgUrl})`};

                                        return (
                                            <li key={fbEvent.id}>
                                                <a href={`https://facebook.com/${fbEvent.id}`} target="_blank">
                                                    <div className="event-img" style={style} />
                                                    <p className="event-name">{fbEvent.name}</p>
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
            if (!_.isEmpty(CB.Controllers.FbEvents.store.fbEventData)) {
                this.$loaderWrapper.hide();
            }
        },

        _initElements() {
            const $rootEl = $(ReactDOM.findDOMNode(this.refs.root));

            this.$loaderWrapper = $rootEl.children(".centered-contents");
        }
    })
};

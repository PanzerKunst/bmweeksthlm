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
                <div className="fb-events">
                    <div className="event-list-wrapper">
                        <ul className="styleless">
                            {store.fbEventData.map(fbEvent =>
                                    <li key={fbEvent.id}>
                                        <a href={`https://facebook.com/${fbEvent.id}`} target="_blank">
                                            <figure>
                                                <img src={fbEvent.imgUrl} />
                                            </figure>
                                            <aside>
                                                <h2>{fbEvent.name}</h2>
                                            </aside>
                                        </a>
                                    </li>
                            )}
                        </ul>
                    </div>
                </div>);
        }
    })
};

controller.init();

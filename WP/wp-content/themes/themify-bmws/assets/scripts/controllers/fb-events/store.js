const store = {
    fbEventIds: [],
    fbEventData: [],

    init() {
        $(window).on("facebook:init", () => this._fetchFacebookEventData());
    },

    _fetchFacebookEventData() {
        for (let i = 1; i < 11; i++) {
            const fbEventId = this._extractFbEventIdFromAcf(`fbEventShortNameAndId${i}`);

            if (fbEventId) {
                this.fbEventIds.push(fbEventId);
            }
        }

        for (const eventId of this.fbEventIds) {
            this._requestFbEventData(eventId, fbEvent => this._processFbEventData(fbEvent));
        }
    },

    _processFbEventData(fbEvent) {
        this.fbEventData.push({
            id: parseInt(fbEvent.id, 10),
            name: fbEvent.name,
            description: fbEvent.description,
            startMoment: moment(fbEvent.start_time),
            imgUrl: fbEvent.cover.source
        });

        if (this.fbEventData.length === this.fbEventIds.length) {
            this.fbEventData = _.sortBy(this.fbEventData, e => e.startMoment.valueOf());
            this.reactComponent.forceUpdate();
        }
    },

    _extractFbEventIdFromAcf(controllerDataVarName) {
        const shortNameAndId = BM.ControllerData[controllerDataVarName];

        if (!shortNameAndId) {
            return null;
        }

        const fbEventId = shortNameAndId.substring(shortNameAndId.indexOf(";") + 1);

        return _.isEmpty(fbEventId) ? null : parseInt(fbEventId, 10);
    },

    _requestFbEventData(fbEventId, onSuccess) {
        FB.api(`/${fbEventId}?fields=cover,description,start_time,name,place`, {
            access_token: "1833011923649309|77M2J2UJc9sdgYZYnzE8xx15MAc"
        },
            response => {
                if (response && !response.error && _.isFunction(onSuccess)) {
                    onSuccess(response);
                }
            }
        );
    }
};

export {store as default};

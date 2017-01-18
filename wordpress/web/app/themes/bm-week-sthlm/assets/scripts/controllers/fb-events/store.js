CB.Controllers.FbEvents.store = {
    acfCount: 30,
    fbEventIds: [],
    fbEventData: {},

    init() {
        try {
            if (FB) {
                this._fetchFacebookEventData();
            } else {
                throw "FB not initialised yet";
            }
        } catch (e) {
            $(window).on("facebook:init", () => this._fetchFacebookEventData());
        }
    },

    _fetchFacebookEventData() {
        for (let i = 1; i <= this.acfCount; i++) {
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
        const eventMoment = moment(fbEvent.start_time);
        const eventYyyymmdd = parseInt(eventMoment.format("YYYYMMDD"), 10);

        this.fbEventData[eventYyyymmdd] = this.fbEventData[eventYyyymmdd] || [];

        // Push the event to the value array
        this.fbEventData[eventYyyymmdd].push({
            id: parseInt(fbEvent.id, 10),
            name: fbEvent.name,
            description: fbEvent.description,
            startMoment: moment(fbEvent.start_time),
            location: fbEvent.place ? fbEvent.place.name : null,
            imgUrl: fbEvent.cover ? fbEvent.cover.source : `${CB.themeRoot}/dist/images/event-placeholder.jpg`
        });

        // When all the events are added to the right place, reorder each array by start_time
        let fbEventCount = 0;

        for (const dayFbEvents of _.values(this.fbEventData)) {
            fbEventCount += dayFbEvents.length;
        }

        if (fbEventCount === this.fbEventIds.length) {
            for (let dayFbEvents of _.values(this.fbEventData)) {
                dayFbEvents = _.sortBy(dayFbEvents, e => e.startMoment.valueOf());
            }

            this.reactComponent.forceUpdate();
        }
    },

    _extractFbEventIdFromAcf(controllerDataVarName) {
        const shortNameAndId = CB.ControllerData[controllerDataVarName];

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

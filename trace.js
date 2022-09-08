import {LogOrder} from "./client";
import {Endpoints, request} from "./util";

export const GetTrace = (installationId, from, to, limit = 1000, offset = 0, order = LogOrder.Desc, objectType, objectId, id, actions = []) => {
    let now = new Date().getTime() / 1000;
    from = from ? from : now - (60 * 60 * 24);
    to = to ? to : now;

    let params = {
        from: from, to: to, limit: limit, offset: offset, order: order,
    };

    if (actions && typeof actions === 'string') {
        params.action = actions;
    } else if (actions && actions.length > 0) {
        params.action = actions.join(',')
    }

    if (objectType && objectId) {
        params.object_type = objectType;
        params.object_id = objectId;
    } else if (id) {
        params.id = id;
    }

    let qs = '?' + new URLSearchParams(params).toString();
    return request(Endpoints.Trace + qs, {});
}

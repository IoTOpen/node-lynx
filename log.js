import querystring from "querystring";
import {LogOrder} from "./client";
import {Endpoints, request} from "./util";

export const GetStatus = (installationId, topicFilter) => {
    let qs = topicFilter ? '?' + topicFilter.reduce((prev, cur, id) => {
        if (id !== 0) {
            prev += '&';
        }
        return prev + 'topics=' + cur;
    }, '') : '';
    return request(Endpoints.Status + installationId + qs, {});
}

export const GetLog = (installationId, from, to, limit, offset, order, topics) => {
    let now = new Date().getTime() / 1000;
    from = from ? from : now - (60 * 60 * 24);
    to = to ? to : now;
    limit = limit ? limit : 500;
    offset = offset ? offset : 0;
    order = order ? order : LogOrder.Desc;
    topics = topics ? topics : '';

    let params = {
        from: from,
        to: to,
        limit: limit,
        offset: offset,
        order: order,
        topics: topics
    };
    let qs = '?' + querystring.stringify(params);
    return request(Endpoints.LogV3 + installationId + qs, {});
}

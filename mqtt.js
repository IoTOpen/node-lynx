import { connect } from 'mqtt'
import { connectionOptions } from "./util";

let client = undefined
let callbacks = {}

const match = (filter, topic) => {
    const filterArr = filter.split('/')
    const topicArr = topic.split('/')

    for (let i = 0; i < filterArr.length; i++) {
        if (filterArr[i] === '#') return filterArr.length - 1 <= topicArr.length
        if (filterArr[i] !== '+' && filterArr[i] !== topicArr[i]) return false 
    }
    return filterArr.length === topicArr.length
}

export const MQTTConnect = (onConnectCallback) => {
    client = connect(connectionOptions.mqttOpts)
    if (typeof onConnectCallback === 'function') {
        client.on('connect', onConnectCallback)
    }
    client.on('message', function (topic, payload) {
        let callback = callbacks[topic]
        let jsonPayload = JSON.parse(payload.toString())
        if (callback === undefined) {
            Object.entries(callbacks).forEach(entry => {
                const [filter, cb] = entry;
                if (match(filter, topic) && typeof cb === 'function') {
                    cb(jsonPayload)
                }
            });
            return
        }
        if (typeof callback !== 'function') {
            return
        }
        callback(jsonPayload)
    });
}

export const MQTTDisconnect = () => {
    if (client) {
        client.end(false)
    }
}

export const Subscribe = (topic, callback) => {
    if (client) {
        callbacks[topic] = callback
        client.subscribe(topic)
    }
}

export const Unsubscribe = (topic) => {
    if (client) {
        delete callbacks[topic]
        client.unsubscribe(topic)
    }
}

export const Publish = (topic, payload) => {
    if (client) {
        if (typeof payload === 'object') {
            payload = JSON.stringify(payload)
        }
        client.publish(topic, payload)
    }
}

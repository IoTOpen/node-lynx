import { connect } from 'mqtt'
import { connectionOptions } from "./util";

let client = undefined
let callbacks = {}

const match = (filter, topic) => {
    const filterArr = filter.split('/')
    const topicArr = topic.split('/')

    for (let i = 0; i < filterArr.length; i++) {
        if (filterArr[i] === '#') return filterArr.length <= topicArr.length - 1
        if (filterArr[i] !== '+' && filterArr[i] !== topicArr[i]) return false 
    }
    return filterArr.length === topicArr.length
}

export const MQTTConnect = () => {
    client = connect(connectionOptions.mqttOpts)
    client.on('connect', function () {
        console.log('Mqtt: Connected')
    })
    client.on('message', function (topic, payload) {
        let callback = callbacks[topic]
        if (callback === undefined) {
            Object.entries(callbacks).forEach(entry => {
                const [key, value] = entry;
                if (match(key, topic)) {
                    callback = value
                    return
                }
            });
        }
        if (typeof callback !== 'function') {
            return
        }
        callback(payload)
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
        client.publish(topic, payload)
    }
}
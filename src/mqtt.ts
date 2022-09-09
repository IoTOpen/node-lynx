import * as mqtt from 'mqtt';
import {connectionOptions} from './util';

export type OnMqttMessage = (payload: object) => void

let client: mqtt.Client | undefined = undefined;
const callbacks: Map<string, OnMqttMessage> = new Map<string, OnMqttMessage>();

const match = (filter: string, topic: string) => {
    const filterArr = filter.split('/');
    const topicArr = topic.split('/');

    for (let i = 0; i < filterArr.length; i++) {
        if (filterArr[i] === '#') return filterArr.length - 1 <= topicArr.length;
        if (filterArr[i] !== '+' && filterArr[i] !== topicArr[i]) return false;
    }
    return filterArr.length === topicArr.length;
};

export const MQTTConnect = (onConnectCallback: mqtt.OnConnectCallback) => {
    client = mqtt.connect(connectionOptions.mqttOpts);
    client.on('connect', onConnectCallback);
    client.on('message', function (topic: string, payload: Blob) {
        const callback = callbacks.get(topic);
        const jsonPayload = JSON.parse(payload.toString());
        if (callback === undefined) {
            callbacks.forEach((cb, key) => {
                if (match(key, topic)) {
                    cb(jsonPayload);
                }
            });
            return;
        }
        callback(jsonPayload);
    });
};

export const MQTTDisconnect = () => {
    if (client) {
        client.end(false);
    }
};

export const Subscribe = (topic: string, callback: OnMqttMessage) => {
    if (client) {
        callbacks.set(topic, callback);
        client.subscribe(topic);
    }
};

export const Unsubscribe = (topic: string) => {
    if (client) {
        callbacks.delete(topic);
        client.unsubscribe(topic);
    }
};

export const Publish = (topic: string, payload: object | Blob | string) => {
    if (client) {
        if (typeof payload === 'object') {
            payload = JSON.stringify(payload);
        }
        client.publish(topic, payload);
    }
};

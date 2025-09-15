import {sprintf} from 'sprintf-js';

import type { Functionx } from './functionx';
import type { LogEntry } from './log';

export const formatFunctionValueStatus = (
    status: Record<string, LogEntry>,
    functionx: Functionx,
    topicKey = 'topic_read',
    labels?: Record<string, string>
) => {
    const topic = functionx.meta[topicKey];
    console.log('# 📊 Formatting function value status for topic:', topic);

    if (!(topic in status) || typeof status[topic].value === 'undefined') {
        console.log('## ⚠️ Value is undefined, returning "-"');
        return '-';
    }

    const value = status[topic].value;
    console.log('## ✅ Value found:', value);
    return formatFunctionValue(value, functionx, topicKey, labels);
};

export const getFunctionStates = (functionx: Functionx) =>
    Object.keys(functionx.meta).reduce((res: Record<string, string>, k) => {
        if (k.startsWith('state_')) {
            const stateName = k.slice('state_'.length);
            const stateValue = functionx.meta[k];
            if (!res[stateValue]) {res[stateValue] = stateName;}
        }
        return res;
    }, {});

export const formatFunctionValue = (value: number, functionx: Functionx, topicKey = 'topic_read', labels?: Record<string, string>) =>{
    const topicKeySuffix = (topicKey || '').slice('topic_'.length);
    const topicFormat = functionx.meta[`format_${topicKeySuffix}`] || functionx.meta.format;
    if (topicFormat) {
        try {
            return sprintf(topicFormat, value);
        } catch (_error) {
            return (functionx.meta.unit) ?  value + functionx.meta.unit : sprintf('%.2f', value);
        }
    } else if (functionx.meta.unit) {
        return value + functionx.meta.unit;
    }
    const states = getFunctionStates(functionx);
    const stateKey = states[value];
    if(!stateKey) {
        return value;
    }
    if(functionx.meta[`text_${stateKey}`]){
        return functionx.meta[`text_${stateKey}`];
    }
    if(labels?.[stateKey]){
        return labels[stateKey];
    }
    return stateKey;
};

export const formatFunctionMessageStatus = (
    status: Record<string, LogEntry>,
    functionx: Functionx,
    topicKey = 'topic_read'
) => {
    const topic = functionx.meta[topicKey];
    if (!(topic in status) || typeof status[topic].msg === 'undefined') {
        return '-';
    }
    return status[topic].msg;
};

export const getFunctionTimestampStatus = (
    status: Record<string, LogEntry>,
    functionx: Functionx,
    topicKey = 'topic_read'
) => {
    const topic = functionx.meta[topicKey];
    if (!(topic in status) || typeof status[topic].timestamp === 'undefined') {
        return '-';
    }
    return status[topic].timestamp;
};

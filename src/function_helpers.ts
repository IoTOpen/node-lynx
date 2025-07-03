import {sprintf} from 'sprintf-js';

import type { Functionx } from './functionx';
import type { LogEntry } from './log';

export const formatFunctionValueStatus = (status: Record<string, LogEntry>, functionx: Functionx, topicKey = 'topic_read', labels?: Record<string, string>) => {
    if (functionx.meta[topicKey] && status[functionx.meta[topicKey]]) {
        const currentStatus = status[functionx.meta[topicKey]];
        return formatFunctionValue(currentStatus.value, functionx, topicKey, labels);
    }

    return '---';
};

export const getFunctionStates = (functionx: Functionx) =>
    Object.keys(functionx.meta).reduce((res: Record<string, string>, k) => {
        if (k.startsWith('state_')) {
            const stateName = k.slice('state_'.length);
            const stateValue = functionx.meta[k];

            if (!res[stateValue]) res[stateValue] = stateName;
        }
        return res;
    }, {});

export const formatFunctionValue = (value: number, functionx: Functionx, topicKey = 'topic_read', labels?: Record<string, string>) =>{
    const topicFormat = functionx.meta?.[`format_${(topicKey ?? '')?.slice('topic_'.length)}`] ?? functionx.meta?.format;

    if (topicFormat) {
        try {
            return sprintf(topicFormat, value);
        } catch (error) {
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

export const formatFunctionMessageStatus = (status: Record<string, LogEntry>, functionx: Functionx, topicKey = 'topic_read') => {
    if (
        functionx.meta[topicKey] &&
        status[functionx.meta[topicKey]] &&
        status[functionx.meta[topicKey]].msg !== ''
    ) {
        return status[functionx.meta[topicKey]].msg;
    }
    return '---';
};

export const getFunctionTimestampStatus = (status: Record<string, LogEntry>, functionx: Functionx, topicKey = 'topic_read') => {
    if (topicKey.startsWith('topic_read') && functionx.meta[topicKey] && status[functionx.meta[topicKey]]) {
        return status[functionx.meta[topicKey]].timestamp;
    }
    return '---';
};
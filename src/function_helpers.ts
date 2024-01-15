import {sprintf} from 'sprintf-js';
import { Functionx } from './functionx';
import { LogEntry } from './log';

export const formatFunctionValueStatus = (status: {[key: string]: LogEntry}, functionx: Functionx, topicKey = 'topic_read') => {
    if (functionx.meta[topicKey] && status[functionx.meta[topicKey]]) {
        const currentStatus = status[functionx.meta[topicKey]];
        return formatFunctionValue(currentStatus.value, functionx, topicKey);
    }

    return '---';
};

export const getFunctionStates = (functionx: Functionx) =>
    Object.keys(functionx.meta).reduce((res: {[key: string]: string}, k) => {
        if (k.startsWith('state_')) {
            const stateName = k.slice('state_'.length);
            const stateValue = functionx.meta[k];

            if (!res[stateValue]) res[stateValue] = stateName;
        }
        return res;
    }, {});

export const formatFunctionValue = (value: number, functionx: Functionx, topicKey = 'topic_read', labels?: {[key: string]: string}) =>{
    const topicFormat = functionx.meta?.[`format_${(topicKey ?? '')?.slice('topic_'.length)}`] ?? functionx.meta?.['format'];

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

    if(labels && labels[stateKey]){
        return labels[stateKey];
    }
    return `function_value__${stateKey}`;
};

export const formatFunctionMessageStatus = (status: {[key: string]: LogEntry}, functionx: Functionx, topicKey = 'topic_read') => {
    if (
        functionx.meta[topicKey] &&
        status[functionx.meta[topicKey]] &&
        status[functionx.meta[topicKey]].msg !== ''
    ) {
        return status[functionx.meta[topicKey]].msg;
    }
    return '---';
};

export const getFunctionTimestampStatus = (status: {[key: string]: LogEntry}, functionx: Functionx, topicKey = 'topic_read') => {
    if (functionx.meta.topic_read && status[functionx.meta[topicKey]]) {
        return status[functionx.meta[topicKey]].timestamp;
    }
    return '---';
};
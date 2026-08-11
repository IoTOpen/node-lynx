import { sprintf } from 'sprintf-js';

import type { Functionx } from './functionx';
import type { LogEntry } from './log';

export const formatFunctionValueStatus = (status: Record<string, LogEntry>, functionx: Functionx, topicKey = 'topic_read', labels?: Record<string, string>) => {
    if (functionx.meta[topicKey] && status[functionx.meta[topicKey]]) {
        const currentStatus = status[functionx.meta[topicKey]];
        if (currentStatus !== undefined) {
            return formatFunctionValue(currentStatus.value, functionx, topicKey, labels);
        }
    }
    return '---';
};

export const getFunctionStates = (functionx: Functionx) =>
    Object.keys(functionx.meta).reduce((res: Record<string, string>, k) => {
        if (k.startsWith('state_')) {
            const stateName = k.slice('state_'.length);
            const stateValue = functionx.meta[k];
            if (stateValue !== undefined && !res[stateValue]) {
                res[stateValue] = stateName;
            }
        }
        return res;
    }, {});

export const formatFunctionValue = (value: number, functionx: Functionx, topicKey = 'topic_read', labels?: Record<string, string>) =>{
    let format = functionx.meta[`format_${topicKey.slice('topic_'.length)}`];
    format ??= functionx.meta['format'];

    if (format) {
        try {
            return sprintf(format, value);
        } catch (_error) {
            if (functionx.meta['unit']) {
                return String(value) + functionx.meta['unit'];
            }
            return sprintf('%.2f', value);
        }
    } else if (functionx.meta['unit']) {
        return String(value) + functionx.meta['unit'];
    }

    const states = getFunctionStates(functionx);
    const stateKey = states[String(value)];

    if (!stateKey) {
        return value;
    }

    if (functionx.meta[`text_${stateKey}`]) {
        return functionx.meta[`text_${stateKey}`];
    }

    if (labels?.[stateKey]) {
        return labels[stateKey];
    }
    return stateKey;
};

export const formatFunctionMessageStatus = (status: Record<string, LogEntry>, functionx: Functionx, topicKey = 'topic_read') => {
    const key = functionx.meta[topicKey];
    if (key && status[key] && status[key].msg !== '') {
        return status[key].msg;
    }
    return '---';
};

export const getFunctionTimestampStatus = (status: Record<string, LogEntry>, functionx: Functionx, topicKey = 'topic_read') => {
    const key = functionx.meta[topicKey];
    if (key && status[key]) {
        return status[key].timestamp;
    }
    return '---';
};

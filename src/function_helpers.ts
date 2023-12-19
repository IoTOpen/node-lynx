import {sprintf} from 'sprintf-js';
import { Functionx } from './functionx';
import { LogEntry } from './log';

export const formatFunctionValueStatus = (status: {[key: string]: LogEntry}, functionx: Functionx, topicKey?: string) => {
    topicKey = topicKey ?? 'topic_read';

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

export const formatFunctionValue = (value: number, functionx: Functionx, topicKey: string) =>{
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

    //handle translation key for `function_value__${stateKey}`?
    return (stateKey) ?
        //functionx.meta[`text_${stateKey}`] ?? <Translation>{(t) => <span>{t(`function_value__${stateKey}`)}</span>}</Translation> :
        functionx.meta[`text_${stateKey}`] ?? `function_value__${stateKey}` :
        value;
};

export const formatFunctionMessageStatus = (status: {[key: string]: LogEntry & {msg?: string}}, functionx: Functionx, topicKey = 'topic_read') => {
    if (
        functionx.meta[topicKey] &&
        status[functionx.meta[topicKey]] &&
        status[functionx.meta[topicKey]].msg !== ''
    ) {
        return status[functionx.meta[topicKey]].msg;
    }
    return '---';
};

//deal with formatting in front-end?
export const getFunctionTimestampStatus = (status: {[key: string]: LogEntry}, functionx: Functionx, topicKey = 'topic_read') => {
    if (functionx.meta.topic_read && status[functionx.meta[topicKey]]) {
        //return Utils.ParseDate(status[functionx.meta[topicKey]].timestamp);
        return status[functionx.meta[topicKey]].timestamp;
    }
    return '---';
};
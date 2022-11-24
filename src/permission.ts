import {Endpoints} from './util';
import {LynxClient} from './client';

export function GetPermissions (this: LynxClient) {
    return this.requestJson<{[key: string]: boolean}>(Endpoints.Permission);
}

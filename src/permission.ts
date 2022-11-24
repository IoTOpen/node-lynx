import {Endpoints} from './util';
import {LynxClient} from './client';

export function GetPermissions (this: LynxClient) {
    return this.request<{[key: string]: boolean}>(Endpoints.Permission, {});
}

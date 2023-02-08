import {Endpoints} from './util';
import {LynxClient} from './client';
import {PermissionMap} from './types';

export function GetPermissions (this: LynxClient) {
    return this.requestJson<PermissionMap>(Endpoints.Permission);
}

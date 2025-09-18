import type {LynxClient} from './client';
import type {PermissionMap} from './types';
import {Endpoints} from './util';

export function GetPermissions (this: LynxClient) {
    return this.requestJson<PermissionMap>(Endpoints.Permission);
}

import {Endpoints, request} from './util';

export function GetPermissions () {
    return request<{[key: string]: boolean}>(Endpoints.Permission, {});
}

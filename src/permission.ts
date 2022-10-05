import {Endpoints, request} from './util';

export const GetPermissions = () => request<{[key: string]: boolean}>(Endpoints.Permission, {});

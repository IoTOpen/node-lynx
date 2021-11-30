import {Endpoints, request} from "./util";

export const GetPermissions = () => request(Endpoints.Permission, {});
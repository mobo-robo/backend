import { DEVICE_SERVICE } from "@/device/constants";
import { DeviceService } from "@/device/services";
import { Injectable, CanActivate, Inject } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class WsGuard implements CanActivate {

    constructor(
        @Inject(DEVICE_SERVICE)
        private readonly deviceService: DeviceService) {
    }

    canActivate(
        context: any,
    ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
        const deviceId = context.args[0].handshake.headers.deviceid;
        const secret = context.args[0].handshake.headers.secret;
        context.sample = 'abc';
        try {
            return new Promise((resolve, reject) => {
                return this.deviceService.getDevice(deviceId,secret).then(user => {
                    if (user) {
                        resolve(user);
                    } else {
                        reject(false);
                    }
                });
             });
        } catch (ex) {
            return false;
        }
    }
}
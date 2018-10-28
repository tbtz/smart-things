import ApiService from './ApiService';

class DeviceService {
    constructor(roomId) {
        this.roomId = roomId;
        this.BASE_URL = `/api/rooms/${roomId}/devices/`;
    }

    getAllDevices() {
        return ApiService.getJSON(this.BASE_URL);
    }

    getDevice(deviceId) {
        return ApiService.getJSON(this.BASE_URL + deviceId);
    }

    addDevice(id, deviceConfig) {
        return ApiService.putJSON(this.BASE_URL + id, deviceConfig);
    }

    updateDevice(id, deviceConfig) {
        return ApiService.postJSON(this.BASE_URL + id, deviceConfig);
    }

    removeDevice(deviceId) {
        return ApiService.deleteJSON(this.BASE_URL + deviceId);
    }

    static getDeviceStatus(ip) {
        return ApiService.getJSON(`http://${ip}/cm?cmnd=Power`).then(resp => resp.POWER);
    }

    static turnDeviceOn(ip) {
        return ApiService.getJSON(`http://${ip}/cm?cmnd=Power%20on`).then(resp => resp.POWER);
    }

    static turnOffDeviceOn(ip) {
        return ApiService.getJSON(`http://${ip}/cm?cmnd=Power%20off`).then(resp => resp.POWER);
    }

    static toggleDevice(ip) {
        return ApiService.getJSON(`http://${ip}/cm?cmnd=Power%20toggle`).then(resp => resp.POWER);
    }
}

export default DeviceService;
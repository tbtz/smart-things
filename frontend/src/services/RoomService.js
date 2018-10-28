import ApiService from './ApiService';

class RoomService {
    constructor() {
        this.BASE_URL = '/api/rooms';
    }
    getAllRooms() {
        return ApiService.getJSON(this.BASE_URL + '/');
    }

    getRoom(roomId) {
        return ApiService.getJSON(this.BASE_URL + '/' + roomId);
    }

    addRoom(id, roomConfig) {
        return ApiService.putJSON(this.BASE_URL + '/' + id, roomConfig);
    }

    updateRoom(id, roomConfig) {
        return ApiService.postJSON(this.BASE_URL + '/' + id, roomConfig);
    }

    removeRoom(roomId) {
        return ApiService.deleteJSON(this.BASE_URL + '/' + roomId);
    }
}

export default new RoomService();
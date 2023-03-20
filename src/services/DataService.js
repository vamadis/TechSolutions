import http from "../http-common";

class DataService {
  getAll(url) {
    return http.get(`${url}`);
  }

  getById(id) {
    return http.get(`/Permission/${id}`);
  }

  create(data) {
    return http.post("/Permission",data);
  }

  update(id, data) {
    return http.put(`/Permission/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Permission/${id}`);
  }
}

export default new DataService();

import axios from "../services/axios";

export default {
  exportTasksToExcel() {
    return axios.get("/admin/tasks/export/excel", {
      responseType: "blob",
    });
  },
  exportTasksToPdf() {
    return axios.get("/admin/tasks/export/pdf", {
      responseType: "blob",
    });
  },
  sendTaskReport(userIds) {
    return axios.post("/admin/tasks/send-report", {
      user_ids: userIds,
    });
  },
};

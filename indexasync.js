const api = "https://mindx-mockup-server.vercel.app/api/resources";
const apiKey = "YOUR_API_KEY";

async function getData(resource) {
  const response = await fetch(api + "/" + resource + "?apiKey=" + apiKey);
  if (!response.ok) {
    throw new Error("Lỗi lấy dữ liệu: " + response.status);
  }
  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }
  return data.data;
}
///////
function filterTasks(tasks, flagId, statusId, assignedTo) {
  return tasks.filter(function (task) {
    if (flagId !== "" && task.flagId !== flagId) {
      return false;
    }
    if (statusId !== "" && task.statusId !== statusId) {
      return false;
    }
    if (assignedTo !== "" && task.assignedTo !== assignedTo) {
      return false;
    }
    return true;
  });
}
async function addUser(user) {
  const response = await fetch(api + "/users?apiKey=" + apiKey, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error("Thêm user thất bại: " + response.status);
  }

  console.log("Thêm user thành công");
}
//////
async function addTask(task) {
  const response = await fetch(api + "/tasks?apiKey=" + apiKey, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(task)
  });
  if (!response.ok) {
    throw new Error("Thêm task thất bại: " + response.status);
  }
  console.log("Thêm task thành công");
}
async function updateUser(id, user) {
  const response = await fetch(
    api + "/users/" + id + "?apiKey=" + apiKey,
    { method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    }
  );
  if (!response.ok) {
    throw new Error("Cập nhật user thất bại: " + response.status);
  }
  console.log("Cập nhật user thành công");
}
async function updateTask(id, task) {
  const response = await fetch(
    api + "/tasks/" + id + "?apiKey=" + apiKey,
    { method: "PUT",
    headers: {"Content-Type": "application/json"},
      body: JSON.stringify(task)
    }
  );
  if (!response.ok) {
    throw new Error("Cập nhật task thất bại: " + response.status);
  }
  console.log("Cập nhật task thành công");
}
async function deleteTask(id) {
  const response = await fetch(
    api + "/tasks/" + id + "?apiKey=" + apiKey,
    {method: "DELETE"}
  );
  if (!response.ok) {
    throw new Error("Xóa task thất bại: " + response.status);
  }
  console.log("Xóa task thành công");
}
async function main() {
  try {
    const users = await getData("users");
    console.log("Users:", users);
    const taskStatus = await getData("taskStatus");
    console.log("Trạng thái:", taskStatus);
    const flags = await getData("flags");
    console.log("Flags:", flags);
    const tasks = await getData("tasks");
    console.log("Tasks:", tasks);
    console.log("Flag 2:", filterTasks(tasks, 2, "", ""));
    console.log("Status 1:", filterTasks(tasks, "", 1, ""));
    console.log("User 1:", filterTasks(tasks, "", "", 1));
    console.log("Kết hợp:", filterTasks(tasks, 2, 1, 1));
} catch (error) {
    console.error("Lỗi:", error.message);
  }
}
main();
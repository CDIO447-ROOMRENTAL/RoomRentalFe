// api.js

const handleResponse = async (response) => {
  if (response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } else {
    throw new Error(response.statusText);
  }
};

export const getCookie = async (name) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/cookie/get?name=${name}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy cookie:", error.message);
    throw error;
  }
};

export const setCookie = async ({ name, value }) => {
  try {
    const valueEnder = encodeURIComponent(value);
    const response = await fetch("http://localhost:8080/api/cookie/set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ name: name, value: valueEnder }),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error("Lỗi khi thiết lập cookie:", error.message);
    throw error;
  }
};

export const clearCookie = async (name) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/cookie/clear?name=${name}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error("Lỗi khi xóa cookie:", error.message);
    throw error;
  }
};

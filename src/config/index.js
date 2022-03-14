const appConfig = {
  appUrl: "https://dev.servicepack.ai",
  token: localStorage.getItem("token") || "",
  authToken: () => localStorage.getItem("token") || ""
};

export default appConfig

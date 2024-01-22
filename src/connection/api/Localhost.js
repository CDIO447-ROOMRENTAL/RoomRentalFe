const localhost = {
  server1: "http://localhost:8080/api",
};
const server = localhost.server1;

export const auth = {
  login: `${server}/auth/signIn`,
  register: `${server}/auth/signUp`,
  verify: `${server}/auth/verify`
};
export const cookie= {
  get:`${server}/cookie/get`,
  set:`${server}/cookie/set`,
  clear:`${server}/cookie/clear`
}
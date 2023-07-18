import Cookies from "js-cookie";

export function Auth() {
  const token = Cookies.get('token');
  if(!token || token === undefined || token === null) {
    return false
  } else {
    return true
  }

}


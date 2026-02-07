// frontend/src/lib/cookie.ts

export const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  if (typeof window !== 'undefined') {
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
}

export const getCookie = (name: string): string | null => {
    if (typeof window === 'undefined') {
        return null;
    }
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

export const removeCookie = (name: string) => {
    if (typeof window !== 'undefined') {
        document.cookie = name+'=; Max-Age=-99999999;';
    }
}

export const BASE_URL = 'http://10.0.2.2:8080';
export const CHAT_URL = `${BASE_URL}/chat`;
export const MESSAGE_URL = (id: string) => `${CHAT_URL}/${id}/message`;
export const FOUNDREPORT_URL = (id?: string) =>
  `${BASE_URL}/report/found/${id}`;
export const LOSTREPORT_URL = (id?: string) => `${BASE_URL}/report/lost/${id}`;
export const CREATE_LOSTREPORT_URL = () => `${BASE_URL}/report/lost`;
export const CREATE_FOUNDREPORT_URL = () => `${BASE_URL}/report/found`;

export const ALL_LOST_REPORTS_URL = `${BASE_URL}/report/lost`;
export const ALL_FOUND_REPORTS_URL = `${BASE_URL}/report/found`;

export const ALL_CATEGORIES_URL = `${BASE_URL}/categories`;

export const LOGIN_URL = `${BASE_URL}/login`;
export const USER_URL = `${BASE_URL}/user`;
export const REGISTER_URL = `${BASE_URL}/register`;

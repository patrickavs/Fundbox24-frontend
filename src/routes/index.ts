export const BASE_URL = 'localhost:8081/api';
export const CHAT_URL = `${BASE_URL}/chat`;
export const MESSAGE_URL = (id: string) => `${CHAT_URL}/${id}/message`;
export const FOUNDREPORT_URL = (id?: string) =>
  `${BASE_URL}/found-report/${id}`;
export const LOSTREPORT_URL = (id?: string) => `${BASE_URL}/lost-report/${id}`;

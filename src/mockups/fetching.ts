export type Request = {
  method: string;
  url: string;
  data?: any;
  headers?: {
    [key: string]: string;
  };
};

export type Response = {success: boolean; data?: any; error?: any};

export type FetchType = (request: Request) => Promise<Response>;

export const fetchAdapter = async ({
  method,
  url,
  data,
  headers,
}: Request): Promise<Response> => {
  return fetch(url, {method, body: JSON.stringify(data), headers})
    .then(async response => {
      if (response.status in [200, 201]) {
        return {success: true, data: await response.json()};
      } else {
        return {success: false, data: await response.json()};
      }
    })
    .catch(error => ({success: false, error: JSON.stringify(error)}));
};

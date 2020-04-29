const methods = ["get", "post", "put", "patch", "delete"];

function makeUrl(url: string): string {
  // concat BASE_URL with the path
  // @ts-ignore
  return process.env.PUBLIC_URL + url;
}
export function checkStatus(response: any): Promise<PromiseConstructor> {
  if (response.code && (response.code == "403" || response.code == "500")) {
    return Promise.reject(response);
  }
  if (response.status === 200 || response.status === 400) {
    return response.json();
  }
  return Promise.reject(response);
}

export function parseJSON(response: any) {
  if (response.status === "success") {
    return response;
  } else {
    return Promise.reject(response);
  }
}

function fetchCreator(method: string, url: string, options: any): Promise<any> {
  options.method = method;
  // create feth function
  // @ts-ignore
  return this.request(makeUrl(url), options)
    .then(checkStatus)
    .then(parseJSON);
}
class ApiClient {
  constructor() {
    methods.forEach((method: string) => {
      // create fetch function for every method
      // @ts-ignore
      this[method] = fetchCreator.bind(this, method);
    });
  }

  request(url: string, { data, ...options }: any = {}) {
    const fetchOptions = options;
    fetchOptions.headers = fetchOptions.headers || {};

    if (fetchOptions.type === "formdata") {
      fetchOptions.body = new FormData();

      for (let key in data) {
        if (
          typeof key === "string" &&
          data.hasOwnProperty(key) &&
          typeof data[key] !== "undefined"
        ) {
          fetchOptions.body.append(key, data[key]);
        }
      }
    } else {
      fetchOptions.body = JSON.stringify(data);
      fetchOptions.headers["Content-Type"] = "application/json";
    }
    // @ts-ignore
    if (this.jwt) {
      // @ts-ignore
      fetchOptions.headers.token = this.jwt;
    }
    return fetch(url, fetchOptions);
  }
}
export default ApiClient;

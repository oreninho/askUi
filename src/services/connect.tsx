// import fetch, { RequestInit } from "node-fetch";

// class Connection {

//     private apiKey?: string;

//   constructor() {

//   }

//   public init(apiKey: string) {
//     this.apiKey = apiKey;
//   }

//   async get<T = any>(url: string, options?: RequestInit): Promise<T> {
//     return this.fetchJson<T>(url, "GET", options);
//   }

//   async post<T = any>(url: string, data: any, options?: RequestInit): Promise<T> {
//     return this.fetchJson<T>(url, "POST", { ...options, body: JSON.stringify(data) });
//   }

//   private async fetchJson<T = any>(url: string, method: string, options?: RequestInit): Promise<T> {
//     const headers = this.apiKey ? { "X-API-Key": this.apiKey, ...options?.headers } : options?.headers;

//     const response = await fetch(url, { ...options, method, headers });
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     else{
//         return response.json() as unknown as T;
//     }
//   }


// }

// const connection = new Connection();

// export default connection;
import axios, { AxiosRequestConfig } from "axios";

class Connection {
  private apiKey?: string;

  constructor() {}

  public init(apiKey: string) {
    this.apiKey = apiKey;
  }

  async get<T = any>(url: string, options?: AxiosRequestConfig): Promise<T> {
    return this.fetchJson<T>(url, "GET", options);
  }

  async post<T = any>(url: string, data: any, options?: AxiosRequestConfig): Promise<T> {
    return this.fetchJson<T>(url, "POST", { ...options, data });
  }

  private async fetchJson<T = any>(
    url: string,
    method: "GET" | "POST",
    options?: AxiosRequestConfig
  ): Promise<T> {
    const headers = this.apiKey
      ? { "X-API-Key": this.apiKey, ...options?.headers }
      : options?.headers;

    try {
      const response = await axios({
        url,
        method,
        headers,
        ...options,
      });
      return response.data as T;
    } catch (error) {
      throw new Error( "An error occurred");
    }
  }
}

const connection = new Connection();

export default connection;

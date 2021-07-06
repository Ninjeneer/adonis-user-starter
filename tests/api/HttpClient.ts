import axios, { Method } from 'axios';

interface HttpClientResponse<T> {
	execution: number;
	status: number;
	data: T;
	headers: any;
}

export default class HttpClient {
	private async send<T>(method: Method, url: string, data?: {}): Promise<HttpClientResponse<T>> {
		const t1 = Date.now();
		const response = await axios.request({
			method,
			data,
			params: method === 'GET' ? data : null,
			url,
		});
		const t2 = Date.now();
		return {
			execution: t2 - t1,
			status: response.status,
			data: response.data,
			headers: response.headers,
		};
	}

	public async post<T>(url: string, data?: {}): Promise<HttpClientResponse<T>> {
		return this.send('POST', url, data);
	}

	public async get<T>(url: string, params?: {}): Promise<HttpClientResponse<T>> {
		return this.send('GET', url, params);
	}

	public async put<T>(url: string, data?: {}): Promise<HttpClientResponse<T>> {
		return this.send('PUT', url, data);
	}

	public async delete<T>(url: string, data?: {}): Promise<HttpClientResponse<T>> {
		return this.send('DELETE', url, data);
	}
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type ApiUrl = string | URL;
type RequestBody = unknown;

// Базовый тип для параметров функции
export async function client (
    url: ApiUrl, 
    method: HttpMethod, 
    body?: RequestBody,
) { 
	const options = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
		},
        ...(body !== undefined && ['POST', 'PATCH', 'PUT'].includes(method))
            ? { body: JSON.stringify(body)  }
            : null
	};

    let data;
    try {
        const response = await window.fetch(url, options);
        data = await response.json();
        if (response.ok) {
            return {
                status: response.status,
                headers: response.headers,
                url: response.url,
                data,
            };
        }
        throw new Error(response.statusText);
    } catch (err)
    {
        return Promise.reject((err instanceof Error && err.message) ? err.message : data);
    }
}

client.get = (url: ApiUrl) => client(url, 'GET');
client.post = (url: ApiUrl, body: RequestBody) => client(url, 'POST', body);
client.delete = (url: ApiUrl) => client(url, 'DELETE');
client.patch = (url: ApiUrl, body: RequestBody) => client(url, 'PATCH', body);
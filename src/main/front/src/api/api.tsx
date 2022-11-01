import axios, { AxiosResponse } from "axios";
import { error } from "console";
import { useState } from "react";
import { Input } from "reactstrap";

const instance = axios.create({
    baseURL: 'http://localhost:3000/'
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, params: {}) => instance.post(url, {}, params).then(responseBody)
	.catch((error) => console.log(error))
	// put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	// delete: (url: string) => instance.delete(url).then(responseBody),
};

const LoginService = {
    createNickname: (nickname: string) => requests.post('login', nickname),
	getNickname: () => requests.get('login')
};

//TODO: find separate place for custom hooks

const useInput = (opts:any) => {
	const [value, setValue] = useState('');
	const input = <Input
		value={value}
		onChange={e => setValue(e.target.value)}
		{...opts} />
	return [value, input];
}

export {
	LoginService,
	useInput
}

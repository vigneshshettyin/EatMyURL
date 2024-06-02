'use server'
import { HTTP_STATUS } from "../constants";

export async function captchaVerify (token:string) {
    const SECRET_KEY = "0x4AAAAAAAbu8XnHHmSbg9kLI3T3HziPSuI"

    let formData = new FormData();
	formData.append('secret', SECRET_KEY);
	formData.append('response', token);

    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});

    const challengeSucceeded = (await result.json()).success;

    if (!challengeSucceeded) {
        return HTTP_STATUS.FORBIDDEN
    }
    else{
        return HTTP_STATUS.OK
    }
}
export default function encodeId(inputId:number) {
    const inputStr = inputId.toString();
    const encodedStr = Buffer.from(inputStr).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    return encodedStr;
}
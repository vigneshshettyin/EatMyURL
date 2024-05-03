
const base64_charset : string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const base62_encode = (integer : number) : string => {
    if (integer === 0) {
        return "0";
    }
    let s : string[] = [];
    while (integer > 0) {
        s = [base64_charset[integer % 62], ...s];
        integer = Math.floor(integer / 62);
    }
    return s.join("");
}

const base62_decode = (chars : string) : number => {
    return chars
        .split("")
        .reverse()
        .reduce(
            (prev, curr, i) => prev + base64_charset.indexOf(curr) * 62 ** i,
            0
        );
}

export { base62_encode, base62_decode };
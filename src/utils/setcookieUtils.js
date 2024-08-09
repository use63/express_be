const setCookie = (res, params) => {
    params.forEach((param) => {

        const { key, value, httpOnly, secure, sameSite } = param;
        res.cookie(key, value, {
            httpOnly,
            secure,
            sameSite,
        });

    })
}

export default setCookie;
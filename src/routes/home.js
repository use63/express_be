const home = (req, res) => {
	res.send(`
        <h1>We provide API service</h1>  
        <pre>
            get  | /api/v1/login
            post | /api/v1/register
            post | /api/v1/logout
            post | /api/v1/check-cookies
            post | /api/v1/logger
        </pre>
        `);
};

export default home
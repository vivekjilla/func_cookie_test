const { createServer } = require("http");
const { parse } = require("url");

const port = parseInt(process.env.FUNCTIONS_CUSTOMHANDLER_PORT || "3000", 10);
const hostname = process.env.WEBSITE_HOSTNAME
const serverOptions = {
  maxHeaderSize: 81920
};

const server = createServer(serverOptions, async (req, res) => {
try {
    const cookies = req.headers["cookie"];
    console.log(req.headers)
    console.log("req cookies: "+ cookies);

    if(!cookies){
        // To Write a Cookie
        res.writeHead(200, {
            "Set-Cookie": `bucket-home=z`,
            "Content-Type": `text/plain`
        });
        console.log("setting response cookies")
    }

    res.end("Received the cookies: " + cookies);
} catch (err) {
    console.error('Error occurred handling', req.url, err);
    res.statusCode = 500;
    res.end('internal server error');
}
});

server.listen(port, (err) => {
if (err) {
    console.error("Failed to start server", err)
    process.exit(1)
}
console.log(`> Ready on http://${hostname}:${port}`)
})

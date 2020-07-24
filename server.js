const next = require("next");
const http = require("http");
const url = require("url");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev })
const port = process.env.PORT || 3000;
const handle = app.getRequestHandler()


app.prepare().then(()=> {
    http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const { pathname } = parsedUrl;

        console.log("**************************")
        console.log(pathname);

        if(pathname === "/service-worker.js"){

            const filePath = path.join(__dirname, ".next", pathname);

            app.serveStatic(req, res, filePath)

        } else {
            handle(req, res, parsedUrl)
        }
    }).listen(port, () => {
        console.log("running on port "+ port)
    })
})
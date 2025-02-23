const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_DIR = path.join("public");
const SRC_DIR = path.join("src");
const IMG_DIR = path.join("Images");
const USERS_FILE = path.join( "users.json"); // Arquivo com usuários

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/check-login") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const { username, password } = JSON.parse(body);

            fs.readFile(USERS_FILE, "utf8", (err, data) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ success: false, message: "Erro no servidor" }));
                    return;
                }

                const users = JSON.parse(data);
                const user = users.find(u => u.username === username && u.password === password);

                if (user) {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ success: true, role: user.role }));
                } else {
                    res.writeHead(401, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ success: false, message: "Usuário ou senha incorretos" }));
                }
            });
        });

        return;
    }

    let filePath = path.join(req.url);

    if (req.url === "/" || req.url === "/index") {
        filePath = path.join(PUBLIC_DIR, "login.html");
    } else {
        if (req.url.startsWith("/src/")) {
            filePath = path.join(SRC_DIR, req.url.replace("/src/", ""));
        } else if (req.url.startsWith("/Images/")) {
            filePath = path.join(IMG_DIR, req.url.replace("/Images/", ""));
        } else {
            filePath = path.join(PUBLIC_DIR, req.url.replace("/public/", ""));
        }

        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 - Página não encontrada</h1>");
            return;
        }
    }

    const extname = path.extname(filePath);
    const contentTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
    };

    const contentType = contentTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.end("<h1>500 - Erro interno do servidor</h1>");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf8");
        }
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


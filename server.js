const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_DIR = path.join("public");
const SRC_DIR = path.join("src");
const IMG_DIR = path.join("Images");
const USERS_FILE = path.join("users.json"); // Arquivo de usuários
const LISTA_FILE = path.join( "listaDeEspera.json");
const PRONTUARIOS_FILE = path.join( "prontuarios.json");

function carregarArquivoJSON(caminho) {
    if (fs.existsSync(caminho)) {
        return JSON.parse(fs.readFileSync(caminho, "utf8"));
    }
    return [];
}

function salvarArquivoJSON(caminho, dados) {
    fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
}

function carregarProntuarios() {
    try {
        const data = fs.readFileSync(PRONTUARIOS_FILE, "utf8");
        return JSON.parse(data) || [];
    } catch (error) {
        console.error("Erro ao carregar prontuários:", error);
        return [];
    }
}

const server = http.createServer((req, res) => {
    // Autenticação de usuário
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

    // Gerenciamento da lista de espera
    if (req.method === "POST" && req.url === "/adicionar-paciente") {
        let body = "";
    
        req.on("data", chunk => {
            body += chunk.toString();
        });
    
        req.on("end", () => {
            console.log("Corpo recebido:", body); // Debugging
    
            if (!body) { // Corrigido erro na verificação de corpo vazio
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, message: "Corpo da requisição vazio" }));
                return;
            }
    
            try {
                const paciente = JSON.parse(body);
    
                if (!paciente.name) {  
                    throw new Error("Dados do paciente inválidos");
                }
    
                // Agora, carregamos a LISTA DE ESPERA, não os prontuários
                fs.readFile(LISTA_FILE, "utf8", (err, data) => {
                    let listaDeEspera = [];
    
                    if (!err) {
                        try {
                            listaDeEspera = JSON.parse(data);
                            if (!Array.isArray(listaDeEspera)) listaDeEspera = []; // Garante que seja um array
                        } catch (parseError) {
                            console.error("Erro ao interpretar JSON, criando novo:", parseError);
                            listaDeEspera = [];
                        }
                    }
    
                    // Correção na atribuição do ID do paciente
                    paciente.id = listaDeEspera.length > 0 
                        ? listaDeEspera[listaDeEspera.length - 1].id + 1 
                        : 1;
    
                    // Adiciona o novo paciente à lista de espera
                    listaDeEspera.push(paciente);
    
                    // Salva a lista atualizada
                    fs.writeFile(LISTA_FILE, JSON.stringify(listaDeEspera, null, 2), err => {
                        if (err) {
                            res.writeHead(500, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ success: false, message: "Erro ao salvar paciente na lista de espera" }));
                            return;
                        }
    
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ success: true, message: "Paciente adicionado à lista de espera com sucesso",id: paciente.id }));
                    });
                });
    
            } catch (error) {
                console.error("Erro ao processar JSON:", error);
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, message: "Erro ao processar JSON" }));
            }
        });
    
        return;
    }
    

    if (req.method === "GET" && req.url === "/obter-lista") {
        console.log("aaa");
        const lista = carregarArquivoJSON(LISTA_FILE);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(lista));
        return;
    }

    if (req.method === "POST" && req.url === "/remover-paciente") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const { id } = JSON.parse(body);
            let lista = carregarArquivoJSON(LISTA_FILE);
            lista = lista.filter(paciente => paciente.id !== id);
            salvarArquivoJSON(LISTA_FILE, lista);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true }));
        });

        return;
    }

    // Gerenciamento de prontuários
    if (req.method === "POST" && req.url === "/adicionar-prontuario") {
        let body = "";
    
        req.on("data", chunk => {
            body += chunk.toString();
        });
        console.log("Corpo recebido11-1:", body); // Debugging
    
        req.on("end", () => {
            idRetorno=-1;
            try {
                console.log("Corpo recebido11-2:", body); // Debugging
                let prontuarios = carregarProntuarios();
                const novoProntuario = JSON.parse(body);
                
                // Atribuir um ID único
                novoProntuario.id = prontuarios.length + 1;
                idRetorno=prontuarios.length + 1;
                prontuarios.push(novoProntuario);
    
                console.log("Corpo recebido11-3:", body); // Debugging
    
                // Salvar no arquivo JSON de forma assíncrona
                fs.writeFile(PRONTUARIOS_FILE, JSON.stringify(prontuarios, null, 2), err => {
                    if (err) {
                        console.error("Erro ao salvar prontuário:", err);
                        if (!res.headersSent) { // Evita erro de múltiplas respostas
                            res.writeHead(500, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ success: false, message: "Erro ao salvar prontuário" }));
                        }
                        return;
                    }
    
                    console.log("Corpo recebido11-4:", body); // Debugging
    
                    if (!res.headersSent) { // Garante que a resposta seja enviada apenas uma vez
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ success: true, message: "Prontuário salvo com sucesso", id: novoProntuario.id }));
                    }
                });
                
            } catch (error) {
                console.error("Erro no processamento do prontuário:", error);
                if (!res.headersSent) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ success: false, message: "Erro ao salvar prontuário" }));
                }
            }
            return ;
        });
        return;
    }
    

    // Rota para obter um prontuário pelo ID
    else if (req.method === "GET" && req.url.startsWith("/obter-prontuario")) {
        const urlParams = new URL(req.url, `http://${req.headers.host}`);
        const id = parseInt(urlParams.searchParams.get("id"));

        let prontuarios = carregarProntuarios();
        const prontuario = prontuarios.find(p => p.id === id);
        
        if (prontuario) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(prontuario));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, message: "Prontuário não encontrado" }));
        }
    }

    if (req.method === "POST" && req.url === "/atualizar-lista") {
        let body = "";
        req.on("data", chunk => { body += chunk.toString(); });
        req.on("end", () => {
            try {
                const novaLista = JSON.parse(body);
                if (!Array.isArray(novaLista)) {
                    throw new Error("Formato inválido: esperado um array de pacientes.");
                }

                salvarArquivoJSON(LISTA_FILE, novaLista);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true, message: "Lista de espera atualizada com sucesso." }));
            } catch (erro) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, message: erro.message }));
            }
        });
        return;
    }

    // Servindo arquivos estáticos
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

// Iniciando o servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

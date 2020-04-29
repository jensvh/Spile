const http = require('http');
const url = require('url');
const fs = require('fs');
const { parse } = require('querystring');
const { exec } = require('child_process');

const port = 8080;

// Post request
// inputs: java, yml
// write as files in a map
// compile all classes in that map (javac -d ./<folder> *.java)
// pack all files in that map to jar (jar cvf <file_name>.jar *)
// send jar back

const server = http.createServer((req, res) => {
    // parse data
    var q = url.parse(req.url, true);
    
    if (req.method == "GET") {
        returnFile("." + q.pathname, res);
    } else if (req.method == "POST") {
        // Get java and yml code
        collectRequestData(req, (result) => {
            var java = result["java"];
            var yml = result["yml"];

            fs.writeFile("Main.java", java, (err) => {
                if (err) {
                    console.log(err);
                    res.end("An error occured, please read server log.");
                    return;
                }

                fs.writeFile("plugin.yml", yml, (err) => {
                    if (err) {
                        console.log(err);
                        res.end("An error occured, please read server log.");
                        return;
                    }

                    exec("javac -classpath ./spigot-api-1.15.2.jar Main.java", (err, stdout, stderr) => {
                        if (err) {
                            console.log(err);
                            res.end("An error occured, please read server log.");
                            return;
                        }
                        if (stderr) {
                            console.log(stderr);
                            res.end("An error occured, please read server log.");
                            return;
                        }
                        exec("jar cf Plugin.jar Main.class plugin.yml", (err, stdout, stderr) => {
                            if (err) {
                                console.log(err);
                                res.end("An error occured, please read server log.");
                                return;
                            }
                            if (stderr) {
                                console.log(stderr);
                                res.end("An error occured, please read server log.");
                                return;
                            }
                            returnFile("Plugin.jar", res);
                        });
                    });
                });
            })
        });
        // compile code
        // pack code
        // return file
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end("404 Not Found");
    }
});

server.listen(8080, () => {
    console.log("Server running at port 8080.")
});

function returnFile(name, res) {
    fs.readFile("./" + name, function(err, data) {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            return res.end("404 Not Found");
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(data);
        return res.end();
    });
}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}
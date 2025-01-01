const http = require("http");
 
const server = http.createServer(function(request, response){
    console.log(request.url);
    
    let body = '';
    request.on('readable', function() {
        body += request.read();
    });
    request.on('end', () => {
        console.log(body);
        response.write('OK'); 
        response.end(); 
    });
});

server.listen(3000, () => {
    console.log("Server listens on port 3000")
});
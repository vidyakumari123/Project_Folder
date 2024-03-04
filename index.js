let http = require("http");
let fs = require("fs");
let path = require("path");

const server = http.createServer((req, res) => {
  let homePath = path.join(__dirname, "public/home.html");
  let aboutPath = path.join(__dirname, "public/about.html");
  let coursePath = path.join(__dirname, "public/course.html");
  let registryPath = path.join(__dirname, "public/register.html");
  let Path404 = path.join(__dirname, "public/404.html");
  let imagePath = path.join(__dirname, "public/jsp.jpg");
  let dbPath1 = path.join(__dirname, "db/cards.json");
  let dbPath2 = path.join(__dirname, "db/mern.json");
  let facultyPath = path.join(__dirname, "db/faculty.json");
  let stylePath=path.join(__dirname,"css/style.css")
  if (req.url == "/" && req.method == "GET") {
    fs.readFile(homePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("somthing wrong while reading , files");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url == "/about" && req.method == "GET") {
    fs.readFile(aboutPath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("somthing wrong while reading , files");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url == "/course" && req.method == "GET") {
    fs.readFile(coursePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("somthing wrong while reading , files");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url == "/register" && req.method == "GET") {
    fs.readFile(registryPath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("somthing wrong while reading , files");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url == "/jsp") {
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("somthing wrong while reading , files");
      } else {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
      }
    });
  }
  else  if (req.url == "/register" && req.method == "POST") {
    fs.readFile(facultyPath, "utf-8", (err, data) => {
      let msg = "";
      req.on("data", (chunk) => {
        msg += chunk;
      });
      req.on("end", () => {
        fs.readFile(facultyPath, "utf-8", (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("somthing wrong");
          } else {
            let parseData = JSON.parse(data);

            msg = JSON.parse(msg);
            msg = { ...msg, id: parseInt(Math.random() * 1000000) };
            console.log(msg);
            parseData = [...parseData, msg];
            fs.writeFile(facultyPath, JSON.stringify(parseData), (err) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("somthing wrong");
              } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(parseData));
              }
            });
          }
        });
      });
    });
  }
   else if(req.url=="/register" && req.method=="DELETE")
  {
     try{
      let id=''
          req.on('data',(chunk)=>{
              id+=chunk
          })
          req.on('end',()=>{
            fs.readFile(facultyPath,'utf-8',(err,data)=>{
              if(err)
              {
                res.writeHead(500,{"Content-Type":"text/plain"})
                res.end('somthing wrong while ,reading file')
              }
              else{
                let orignialData=JSON.parse(data)
                let filterData=orignialData.filter((item)=>{
                  return item.id !=id
                })
                fs.writeFile(facultyPath,JSON.stringify(filterData),(err)=>{
                  if(err)
                  {
                    res.writeHead(500,{"Content-Type":"text/plain"})
                    res.end('somthing wrong while ,reading file')
                  }
                  else{
                       res.end(JSON.stringify(filterData))
                  }
                })
                 
              }
            })
          })
         
     }
     catch(err)
     {
      console.log(err)
      res.end("somthing wrong!")
     }
  }
  else if(req.url=="/register" && req.method=="PUT")
{
  try{
    let editData=''
    req.on('data',(chunk)=>{
       editData+=chunk
    })
    req.on('end',()=>{
      let parseEditData=JSON.parse(editData)
       fs.readFile(facultyPath,'utf-8',(err,data)=>{
        if(err)
        {
          res.writeHead(500,{"Content-Type":"text/plain"})
          res.end('somthing wrong while ,reading file')
        }
        else{
               let orignialDbData=JSON.parse(data)
               let updateDbData=orignialDbData.map((item)=>{
                if(item.id==parseEditData.id)
                {
                  let updatedText=parseEditData.text
                  let subjectText=parseEditData.subject
                  return {
                    ...item,
                    text:updatedText,
                    subject:subjectText
                  }
                }
                else{
                  return item
                }
               })
               fs.writeFile(facultyPath,JSON.stringify(updateDbData),(err)=>{
                if(err)
                {
                  res.writeHead(500,{"Content-Type":"text/plain"})
                  res.end('somthing wrong while ,reading file')
                }
                else{
                  let editUpdatedData=JSON.stringify(updateDbData)
                  res.end(editUpdatedData)
                }
               })
        }
       })
    
    })
  }
  catch(err)
  {
    console.log(err)
    res.end(err.message)
  }
}
 
  else if (req.url == "/get") {
    fs.readFile(dbPath1, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("somthing wrong while reading , files");
      } else {
        let parseData = JSON.parse(data);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(parseData));
      }
    });
  }
  else if (req.url == "/card") {
    fs.readFile(dbPath2, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("somthing wrong while reading , files");
      } else {
        let parseData = JSON.parse(data);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(parseData));
      }
    });
  }
  else if(req.url=='/style'){
    fs.readFile(stylePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("somthing wrong while reading , files");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  }
   else {
    fs.readFile(Path404, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("somthing wrong while reading , files");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
});

server.listen(8081);







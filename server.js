//usei o express para criar e configurar o servidor
const express = require("express")
const server = express()

const db = require("./db")



//const ideas = [
 //   {
 //       img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
  //      title: "Cursos de Programação",
   //     category: "Estudo",
 //       description: "lorem",
 //       url: "https://rocketseat.com.br"
 //   },

 //   {
 //       img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
  //      title: "Meditação",
  //      category: "Saúde",
  //      description: "lorem",
  //      url: "https://rocketseat.com.br"
 //   },

  //  {
  //      img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
  //      title: "Pintura",
  //      category: "Arte",
  //      description: "lorem",
  //      url: "https://rocketseat.com.br"
  //  },

   // {
  //      img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
  //      title: "Karaokê",
  //      category: "Diversão",
  //      description: "lorem",
  //      url: "https://rocketseat.com.br"
   // },
//]



//configurar arq estáticos
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({extended: true}))

//configuracao do nunjucks

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
    autoescape: true
})


//rota /
server.get("/", function(req, res){

    db.all('SELECT * FROM ideas', function(err, rows){
        if (err) return console.log(err)

        const reverseIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reverseIdeas){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", { ideas: lastIdeas })
        })        
})

server.get("/ideias", function(req, res){

    db.all('SELECT * FROM ideas', function(err, rows){
        if (err){
            console.log(err)
            return res.send("Erro no BD")
        }
        const reverseIdeas = [...rows].reverse()

        return res.render("ideias.html", {
            ideas: reverseIdeas
        })
        })
})

server.post("/", function(req, res){
    req.body
    //inserir dados na tabela
    const query = 
        `INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
    ) VALUES (?,?,?,?,?);`

    const values = [
       req.body.image,
       req.body.title,
       req.body.category,
       req.body.description,
       req.body.link,
    ]

  db.run(query, values, function(err){
    if (err){
        console.log(err)
        return res.send("Erro no BD")
    }

    return res.redirect("/ideias")
  })
})

//liguei meu servidor na porta 3000
server.listen(3000)

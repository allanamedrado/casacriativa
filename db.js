//deletar dado

//db.run('DELETE FROM ideas WHERE id = ?', [1], function(err){
//    if (err) return console.log(err)
//
//    console.log("Deletei", this)
//})

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')


db.serialize(function() {
    //criar a tabela 

    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    //consultar dados na tabela

    db.all('SELECT * FROM ideas', function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    })

})

module.exports = db
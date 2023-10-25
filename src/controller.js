import {pool} from './database.js' ;

class LibroController{
    
    async getAll(req, res) {
        try{
        const [result] = await pool.query('SELECT * FROM libros') ;
        res.json(result);
    } catch (error){
        console.log(error);
    }
}

    async getOne(req, res){
        try {
            const id = req.params.id;
            const [result] = await pool.query(`SELECT * FROM libros WHERE id=(?)`, [libro.id]);
            if (result.length === 0) {
                throw new Error('Libro no encontrado.');
            }
            res.json(result[0]); 
        } catch (error) {
            console.log(error);
            res.status(404).json({ error: 'id inexistente.' });
        }
    }
        
    

    async add(req, res){
        
        const libro = req.body;
        try{
        const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, ano_publicacion, ISBN) VALUES (?,?,?,?,?)`, [libro.nombre, libro.autor, libro.categoria, libro.ano_publicacion, libro.ISBN]);
       
        res.json({"Id insertado": result.insertId});

         
    } catch (error) {
        console.log('Error al añadir el libro:',error);
    }
}

async deleteISBN(req, res){
    try{
    const libro = req.body;
    const [result] = await pool.query(`DELETE FROM Libros WHERE ISBN=(?)`, [libro.ISBN]);
   if (result.affectedRows > 0){
    res.json({"message": `Libro con ISBN ${libro.ISBN} eliminado exitosamente`});
   }else{
    res.status(404).json({ "Error" : "No se encontro ningun libro con el ISBN ingresado"});
   }
}catch (error) {
    res.status(500).json({ "Error" : "Ocurrio un error eliminar el libro"});
}
   
}

    async update(req,res){
        try{
        const libro = req.body;
        const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), ano_publicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.ano_publicacion, libro.ISBN, libro.id]);
        if (result.changedRows === 0) {
            throw new Error('No se encontró un libro con el ID proporcionado o los datos ya existen.');
        }
        res.json({"Registros actualizados": result.changedRows});
     } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el libro' });
    }
} 
    

}
export const libro = new LibroController();
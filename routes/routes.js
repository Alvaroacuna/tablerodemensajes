const { name } = require('ejs');
const { Router } = require('express');
const { Message, Comment } = require('../db');
const router = Router();

router.get('/', async (req, res) => {  
  const messages = await Message.findAll({
    include: [Comment]
  });

  const comments = await Comment.findAll({
    include: [Message]
  });

  console.log(messages);
  res.render('tablero.ejs', {messages: messages, comments: comments})
});

router.post("/message",  async (req, res) => { 
  if(req.body.name == "" || req.body.message == ""){
    return res.send("Error, debes completar los campos");
  }
	let newMessage = await Message.create({    
    name: req.body.name,
    message: req.body.message
  });		
	res.redirect('/');
});


router.post("/comment",  async (req, res) => { 
  if(req.body.commentname == "" || req.body.comment ==""){
    return res.send("Error, el nombre o el comentario no puede ser vacío");
  }

  let newComment = await Comment.create({    
    name: req.body.commentname,
    comment: req.body.comment,
    MessageId: req.body.idmessage
  });   
  console.log(newComment);
  res.redirect('/');
});

router.get('/borrar/:id', async (req,res) => {
  console.log("Mensaje Borrado");
  const eliminar = await Message.findByPk(req.params.id);
  await eliminar.destroy();
  res.redirect("/")
});


router.get('/borrarcomentario/:id', async (req,res) => {
  console.log("Comentario Eliminado");
  const eliminar = await Comment.findByPk(req.params.id);
  await eliminar.destroy();
  res.redirect("/")
});


module.exports = router;

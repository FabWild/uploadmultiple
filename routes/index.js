var express = require('express');
var router = express.Router();

const multer  = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'tmp/' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Upload de fichiers images (PNG, < 3Mo)' });
});

// POST /monupload
router.post('/monupload', upload.array('picture'), function(req, res, next) {
  console.log(req.body);
  console.log(req.files);
  if (req.files.length > 0) {
    for (var i = 0; i < req.files.length; i++) {
      if (req.files[i].originalname.length < 241){
        if(req.files[i].size < (3*1024*1024) && req.files[i].mimetype == 'image/png') {
          fs.rename(req.files[i].path,'public/images/'+req.files[i].originalname);
        } else {
          res.render('index',{title:'Attention, image de type png ou jpeg requis, 3Mo de poids maximum'});
        }
      } else {
        res.render('index',{title:'Attention, nom de fichier trop long'});
      }
    }
    console.log(req.files.length);
    res.render('index',{title:'Upload de '+ req.files.length +' fichiers ok'});
  } else {
    res.render('index',{title:'Attention, une image est requise :'});
  }
});

module.exports = router;

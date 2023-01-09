const { render } = require('ejs');
const express = require('express');

//express app
const app = express();
const mongoose = require('mongoose');
const To_do = require('./models/to_do');
const morgan = require('morgan')
const PORT = process.env.PORT || 3000



//view engine
app.set('view engine', 'ejs');

//connect to mongodb and listen for requests
const dbURI = 'mongodb+srv://ibrahim:poesy@todowebsite.psixhrg.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => app.listen(PORT, () => {
        console.log(`listening on 3000`);
        }) )
    .catch((err) => console.log(err))




//static files & middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));


//testing the database
app.get('/add-to-do', (req,res) => {
    const to_do = new To_do({
        title: 'new to do',
        summary: 'complete assesment',
        body: 'there is really a lot to do'
    });

    to_do.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/', (req,res) => {
    res.redirect('/to-dos')

   // res.render('index', {title: 'Home' , to_do});
});
 
//reading from data base and passing to frontend
app.get('/to-dos', (req, res) => {
  To_do.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', { title: 'All To-dos', to_dos: result})

    })  
    .catch((err) => {
        console.log(err);
    })
})


//post request
app.post('/to-dos', (req,res) => {
    const to_do = new To_do(req.body);

    to_do.save()
        .then((result) => {
            res.redirect('/to-dos');
        })
        .catch((err) => {
            console.log(err)
        });

})


//delete
app.delete('/to-dos/to-do/delete/:id', (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    

    To_do.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: 'to-dos'});
            
        })
        .catch(err => {
            console.log(err); 
        })
} )

//edit
app.get('/to-dos/view/:id', (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);


    To_do.findById(id)
        .then(result => {
            res.render('edit', {to_do: result, title:'Edit To-do' });
        })
        .catch((err) => {
            console.log(err)
        })


    });

    app.post('/to-dos/edit/:id', (req, res) => {
        const id = req.params.id
        console.log(req.body)
        console.log(id)



    To_do.findByIdAndUpdate(id, {$set: {title:req.body.title, body:req.body.body, summary:req.body.summary}}, {new:true}, (err, doc) => {
            if (err) {
                console.log(err);
            }
        
        
            res.redirect('/');
        })



    

        
           
    });         


    




app.get('/to-dos/create', (req, res) => {
    res.render('create', {title: 'Create To-do'});
});

app.get('/to-dos/to-do/:id', (req, res) => {
    id = mongoose.Types.ObjectId(req.params.id)
    To_do.findById(id)
        .then((result) =>{
            res.render('details', {to_do: result, title: 'Full Details'} );
        })
        .catch((err) => {
            console.log(err)
        })
});





app.use((req,res) => {

    res.status(404).render('404', {title: '404'});
});
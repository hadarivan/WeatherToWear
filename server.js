const express = require('express');
const productCtl = require('./controller/product.ctl');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser=require('body-parser');

app.set('port',port);
app.use('/', express.static('./public')); // for API
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:false}));
// app.use(//middleware
// (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", 
//     "Origin,X-Requested-With, Content-Type, Accept");
//     res.set("Content-Type", "application/json");
//     next();
// });

/* All routes of admin */
app.get('/admin', productCtl.getAllData); // shows all product to the admin.
app.post('/admin/delete', productCtl.deleteProductById); //admin can delete product by its id 
app.post('/admin/add', productCtl.addProduct); //admin can add product
app.post('/admin/edit', productCtl.editPriceById); //admin can delete product by its id 
/* All routes of consumer */
app.get('/consumer/:season', productCtl.getProductBySeason); // products by season
app.post('/consumer/:season', productCtl.getProductBySGA); // S-season , G-gender, A-age the consumer must enter those params ****לחייב את המשתמש להכניס את הפרמטרים האלו**
/* routes for the consumer profile */
app.post('/consumer/SGAP/:season', productCtl.getProductBySGAP); // S-season , G-gender, A-age, P-price
app.post('/consumer/SGAB/:season', productCtl.getProductBySGAB); // S-season , G-gender, A-age, B-brand
app.post('/consumer/SGAP/:season', productCtl.getProductBySGABP); // S-season , G-gender, A-age, P-price, B-brand
app.all('*', productCtl.routeNotFound);
app.listen(port, () => console.log(`listening on port ${port}`));
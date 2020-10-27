const express = require('express');
const JOI = require('joi');
const Joi = require('@hapi/joi');

const app = express();

app.use(express.json());

const items = [
    { id: 1, name: 'item1' },
    { id: 2, name: 'item2' },
    { id: 3, name: 'item3' }
]


app.get('/', (req, res) => {
    res.send('Welcome to Expressjs');
});

app.get('/api/items', (req, res) => {
    res.send([1, 2, 3, 4]);
});

app.get('/api/item/:id', (req, res) => {
    const item = items.find(c => c.id === parseInt(req.params.id));
    if (!item) res.status(404).send('Item not Found');
    res.send(item);
});

//Using @hapi/joi validators
app.post('/api/course', (req, res) => {
    // const schema = Joi.object({
    //     item: Joi.string().required().min(1),
    //     value: Joi.string().required()
    // })
    // const result = schema.validate(req.body);
    const { error } = itemValidators(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    res.send('I am Running');
});

//Using joi Validators
app.post('/api/item', (req, res) => {
    const schema = {
        item: JOI.string().required().min(1)
    }
    const result = JOI.validate(req.body, schema);
    // console.log(result);
    if (result.error) {
        // res.status(400).send(result);
        res.status(400).send(result.error.details[0].message);
        return
    }
    //Validating Input
    // if (!req.body.item || req.body.item.length < 1) {
    //     res.status(400).send('Bad Request');
    //     return
    // }
    // Creating new item obj
    const item = {
        id: items.length + 1,
        item: req.body.item
    }
    items.push(item);
    res.send(`${item.id} : Item added successfully`);
});

app.get('/api/posts/:year/:month', (req, res) => {
    // res.send(req.params.year);
    // res.send(req.params);
    res.send(req.query);
});

app.put('/api/item/:id', (req, res) => {
    const item = items.find(c => c.id === parseInt(req.params.id));
    const schema = Joi.object({
        item: Joi.string().required().min(1)
    })
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return
    }
    item.name = req.body.item;
    res.send(item);
});

app.delete('/api/item/:id', (req, res) => {
    const item = items.find(c => c.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not Found');

    const index = items.indexOf(item);
    items.splice(index, 1);

    res.send(item);
});

function itemValidators(item) {
    const schema = Joi.object({
        item: Joi.string().required().min(1)
    })
    return schema.validate(item);
}

const port = process.env.PORT || 8080
app.listen(port, () => { console.log(`Listening on port ${port}`); });
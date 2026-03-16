import express from 'express';
import {validateForm} from './validation.js';

const app = express();

const PORT = 3004;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set("view engine", "ejs");

const contacts = [];

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/admin', (req, res) => {
    res.render("admin",{contacts});
});

app.get('/contact', (req,res) => {
    res.render('contact');
});

app.post('/submit', (req, res) => {
    const contact = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email || null,
        jobtitle: req.body.jobtitle,
        company: req.body.company,
        linkedin: req.body.linkedin || null,
        method: req.body.method,
        other: req.body.other,
        mailinglist: req.body.mailingList,
        emailformat: req.body.emailFormat,
        message: req.body.message,
        timestamp: Date()
    };

    const { isValid, errors } = validateForm(contact);
    if (!isValid) {
        res.render('contact', { errors });
        return;
    }

    contacts.push(contact);

    res.render("submit", { contact });
});

app.listen(PORT, () => {
    console.log(`Server is running at
        http://localhost:${PORT}`)
});
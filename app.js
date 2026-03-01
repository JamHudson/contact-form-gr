import express from 'express';

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
    res.send(contacts);
});

app.post('/submit', (req, res) => {
    const contact = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        jobtitle: req.body.jobtitle,
        company: req.body.company,
        linkedin: req.body.linkedin,
        method: req.body.method,
        other: req.body.other,
        mailinglist: req.body.mailingList,
        emailformat: req.body.emailFormat,
        message: req.body.message,
        timestamp: Date()
    };
    contacts.push(contact);

    res.render("submit", { contact });
});

app.listen(PORT, () => {
    console.log(`Server is running at
        http://localhost:${PORT}`)
});
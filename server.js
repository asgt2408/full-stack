import express from 'express';
import fs from 'fs';
import {dirname} from "path";
import { fileURLToPath } from 'url';
import path from 'path';


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.urlencoded({extended:true}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/save',(req,res) => {
    const newdata = req.body;

    fs.readFile('expenses.json','utf8',(err,data) => {
        let expenses = [];

    if (!err && data) {
      try {
        expenses = JSON.parse(data);
      } catch (e) {
        console.error('Error parsing JSON:', e);
        return res.status(500).send('Corrupted JSON');
      }
    }

        expenses.push(newdata);

        fs.writeFile('expenses.json', JSON.stringify(expenses, null, 2), err => {
            if (err) return res.status(500).send('Error saving');
                res.send('Saved');
        });
    });
});


app.listen(3000,() => {
    console.log("Server is running on port 3000");
});

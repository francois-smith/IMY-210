var router = (app, fs) => {
    app.get('/data/:id', (req, res) => {
        if(req.params["id"] == null){
            res.send("No ID specified");
        }

        let idParam = req.params["id"];
        data_file = 'data.json';

        fs.readFile(data_file, (err, data) => {
            if(err){
                throw err;
            }

            data = JSON.parse(data);
            for(let item of data){
                if(item.id == idParam){
                    res.send(item);
                }
            }
            res.send("item not found");
        });
    });

    app.get('/data', (req, res) => {
        data_file = 'data.json';

        fs.readFile(data_file, (err, data) => {
            if(err){
                throw err;
            }
            res.send(JSON.parse(data));
        });
    });

    app.post('/data', (req, res) => {
        if (Object.keys(req.body).length === 0) {
            res.send("No Item Specified");
        }

        data_file = 'data.json';

        fs.readFile(data_file, (err, data) => {
            if(err){
                throw err;
            }

            let parsedData = JSON.parse(data);
            let index = Object.keys(parsedData).length;
            let newItem = req.body;

            parsedData[index] = newItem;
            parsedData = JSON.stringify(parsedData);
            fs.writeFile(data_file, parsedData, (err, data) => {
                if(err){
                    throw err;
                }
            });

            res.send(parsedData);
        });
    });

    app.put('/data/:id', (req, res) => {
        if(req.params["id"] == null){
            res.send("No ID specified");
        }

        if (Object.keys(req.body).length === 0) {
            res.send("No Information Specified");
        }

        let idParam = req.params["id"];
        data_file = 'data.json';

        fs.readFile(data_file, (err, data) => {
            if(err){
                throw err;
            }

            let 
        });
    });
}

module.exports = router;
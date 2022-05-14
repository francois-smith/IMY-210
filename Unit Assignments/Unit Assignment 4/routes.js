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
                    return;
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
        let newInfo = req.body;
        data_file = 'data.json';

        fs.readFile(data_file, (err, data) => {
            if(err){
                throw err;
            }

            let parsedData = JSON.parse(data);
            
            let i = 0;
            for(let item of parsedData){
                if(item.id == idParam){
                    parsedData[i] = newInfo;

                    parsedData = JSON.stringify(parsedData);
                    fs.writeFile(data_file, parsedData, (err, data) => {
                        if(err){
                            throw err;
                        }
                    });
        
                    res.send(parsedData);
                    return;
                }
                i++;
            }

            res.send("Item with ID could not be found");
        });
    });

    app.delete('/data/:id', (req, res) => {
        if(req.params["id"] == null){
            res.send("No ID specified");
        }

        let idParam = req.params["id"];
        data_file = 'data.json';

        fs.readFile(data_file, (err, data) => {
            if(err){
                throw err;
            }

            let parsedData = JSON.parse(data);
            
            let i = 0;
            for(let item of parsedData){
                if(item.id == idParam){
                    parsedData.splice(i, 1)

                    parsedData = JSON.stringify(parsedData);
                    fs.writeFile(data_file, parsedData, (err, data) => {
                        if(err){
                            throw err;
                        }
                    });
        
                    res.send(parsedData);
                    return;
                }
                i++;
            }

            res.send("Item with ID could not be found");
        });
    });
}

module.exports = router;
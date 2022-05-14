xml2js = require('xml2js');
parser = new xml2js.Parser();

var router = (app, fs) => {
    app.get('/schedule', (req, res) => {
        if(req.body["userName"] == null){
            res.send("No User Specified");
            return;
        }

        let user = req.body["userName"];
        data_file = './schedules/'+user+'.xml';

        fs.readFile(data_file, 'utf8', (err, data) => {
            if(err){
                if(err.errno == -4058){
                    res.send("User Does Not Exist");
                    return;
                }
                return;
            }
            parser.parseString(data, function (err, result) {
                res.send(result);
            });           
        });

    });

    app.get('/event', (req, res) => {
        if(req.body["userName"] == null){
            res.send("No User Specified");
            return;
        }

        if(req.body["eventId"] == null){
            res.send("No Event Specified");
            return;
        }

        let user = req.body["userName"];
        let searchId = req.body["eventId"];
        data_file = './schedules/'+user+'.xml';

        fs.readFile(data_file, 'utf8', (err, data) => {
            if(err){
                if(err.errno == -4058){
                    res.send("User Does Not Exist");
                    return;
                }
                return;
            }

            let json;
            parser.parseString(data, function (err, result) {
                json = result;
            });   

            for(let event of json.schedule.event){
                if(event["$"].id == searchId){
                    res.json(event);  
                    return;
                }
            }

            res.json("Event Not Found In Schedule"); 
        });
    });

    app.post('/event', (req, res) => {
        if(req.body["userName"] == null){
            res.send("No User Specified");
            return;
        }

        if(req.body["event"] == null){
            res.send("No Event Specified");
            return;
        }

        let user = req.body["userName"];
        let searchId = req.body["event"];

        /**
            <event id="IMY210121">
                <title>IMY 210 Classes</title>
                <type>Event</type>
                <date repeat="Weekly">	
                    <day>2</day>
                    <month>March</month>
                    <startingTime>03:30 PM</startingTime>
                    <endingTime>04:30 PM</endingTime>
                </date>
                <guests>
                    <guest>
                        <name>Yan</name>
                        <email>yan.wong@up.ac.za</email>
                    </guest>
                    <guest>
                        <name>Daddy</name>
                        <email>daddylonglegs@gmail.com</email>
                    </guest>
                </guests>
                <venue>IT building</venue>
                <description>
                    World worst brain surgeon giving class on XML.
                </description>
            </event>
         */

        data_file = './schedules/'+user+'.xml';

        fs.readFile(data_file, 'utf8', (err, data) => {
            if(err){
                if(err.errno == -4058){
                    res.send("User Does Not Exist");
                    return;
                }
                return;
            }

            let json;
            parser.parseString(data, function (err, result) {
                json = result;
            });   

            for(let event of json.schedule.event){
                if(event["$"].id == searchId){
                    res.json(event);  
                    return;
                }
            }

            res.json("Event Not Found In Schedule"); 
         });
    });

    // app.post('/data', (req, res) => {
    //     if (Object.keys(req.body).length === 0) {
    //         res.send("No Item Specified");
    //     }

    //     data_file = 'data.json';

    //     fs.readFile(data_file, (err, data) => {
    //         if(err){
    //             throw err;
    //         }

    //         let parsedData = JSON.parse(data);
    //         let index = Object.keys(parsedData).length;
    //         let newItem = req.body;

    //         parsedData[index] = newItem;
    //         parsedData = JSON.stringify(parsedData);
    //         fs.writeFile(data_file, parsedData, (err, data) => {
    //             if(err){
    //                 throw err;
    //             }
    //         });

    //         res.send(parsedData);
    //     });
    // });

    // app.put('/data/:id', (req, res) => {
    //     if(req.params["id"] == null){
    //         res.send("No ID specified");
    //     }

    //     if (Object.keys(req.body).length === 0) {
    //         res.send("No Information Specified");
    //     }

    //     let idParam = req.params["id"];
    //     let newInfo = req.body;
    //     data_file = 'data.json';

    //     fs.readFile(data_file, (err, data) => {
    //         if(err){
    //             throw err;
    //         }

    //         let parsedData = JSON.parse(data);
            
    //         let i = 0;
    //         for(let item of parsedData){
    //             if(item.id == idParam){
    //                 parsedData[i] = newInfo;

    //                 parsedData = JSON.stringify(parsedData);
    //                 fs.writeFile(data_file, parsedData, (err, data) => {
    //                     if(err){
    //                         throw err;
    //                     }
    //                 });
        
    //                 res.send(parsedData);
    //                 return;
    //             }
    //             i++;
    //         }

    //         res.send("Item with ID could not be found");
    //     });
    // });

    // app.delete('/data/:id', (req, res) => {
    //     if(req.params["id"] == null){
    //         res.send("No ID specified");
    //     }

    //     let idParam = req.params["id"];
    //     data_file = 'data.json';

    //     fs.readFile(data_file, (err, data) => {
    //         if(err){
    //             throw err;
    //         }

    //         let parsedData = JSON.parse(data);
            
    //         let i = 0;
    //         for(let item of parsedData){
    //             if(item.id == idParam){
    //                 parsedData.splice(i, 1)

    //                 parsedData = JSON.stringify(parsedData);
    //                 fs.writeFile(data_file, parsedData, (err, data) => {
    //                     if(err){
    //                         throw err;
    //                     }
    //                 });
        
    //                 res.send(parsedData);
    //                 return;
    //             }
    //             i++;
    //         }

    //         res.send("Item with ID could not be found");
    //     });
    // });
}

module.exports = router;
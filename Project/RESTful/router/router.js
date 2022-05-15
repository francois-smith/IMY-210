//Parser and Builder to convert XML to JSON Bi-Directionally
xml2js = require('xml2js');
parser = new xml2js.Parser();
builder = new xml2js.Builder();

//Router that will handle server requests
var router = (app, fs) => {
    
    /**
     * Request to retrieve an entire user schedule.
     * Takes in a username paramater and sends back schedule of specified user.
     * If no schedule with passed in user exists, send back error message.
     */
    app.get('/schedule', (req, res) => {
        //If no username is passed in the return error message
        if(req.body["userName"] == null){
            res.send("No User Specified");
            return;
        }

        //Get user from request body
        let user = req.body["userName"];

        //Construct file path using passed in username
        data_file = './schedules/'+user+'.xml';

        //Attempt to read file with specified username
        fs.readFile(data_file, 'utf8', (err, data) => {
            if(err){
                //If file does not exist, then invalid user was specified
                if(err.errno == -4058){
                    res.send("User Does Not Exist");
                    return;
                }
                return;
            }

            //Otherwise parse recieved file to JSON and send back response.
            parser.parseString(data, function (err, result) {
                res.send(result);
            });           
        });

    });

    /**
     * Request to retrieve a n event from specific schedule.
     * Takes in a username paramater as well as eventID.
     */
    app.get('/event', (req, res) => {
        //If no username is passed in the return error message
        if(req.body["userName"] == null){
            res.send("No User Specified");
            return;
        }

        //If no eventID is passed in the return error message
        if(req.body["eventId"] == null){
            res.send("No Event Specified");
            return;
        }

        //Get user and eventID from request body
        let user = req.body["userName"];
        let searchId = req.body["eventId"];

        //Construct file path using passed in username
        data_file = './schedules/'+user+'.xml';

        //Attempt to read file with specified username
        fs.readFile(data_file, 'utf8', (err, data) => {
            if(err){
                //If file does not exist, then invalid user was specified
                if(err.errno == -4058){
                    res.send("User Does Not Exist");
                    return;
                }
                return;
            }

             //Otherwise parse recieved file and save into variable
            let json;
            parser.parseString(data, function (err, result) {
                json = result;
            });   

            //Search all events from requested schedule file
            for(let event of json.schedule.event){
                //If event is found matching id specified then event was found, send back event to user
                if(event["$"].id == searchId){
                    res.json(event);  
                    return;
                }
            }

            //Otherwise if all events have been checked then event does not exist in user schedule
            res.json("Event Not Found In Schedule"); 
        });
    });


    /*
        Most Basic POST request
        {
            "userName": "DaddyLongLegs",
            "event": {
                "id": "IMY210103",
                "title": "Yeet",
                "type": "Task",
                "date": {
                    "day": 4,
                    "month": "January",
                },
                "guests":[
                    
                ]
            } 
        }

        Most advanced POST request
        {
            "userName": "DaddyLongLegs",
            "event": {
                "id": "IMY210104",
                "title": "Yeet",
                "type": "Task",
                "date": {
                    "repeat": "Daily",
                    "day": 4,
                    "month": "January",
                    "startingTime": "03:30 PM" ,
                    "endingTime": "04:30 PM"
                },
                "guests":[
                    {
                        "guest":[
                            {
                                "name": ["yeet"],
                                "email": ["yeet"]
                            },
                            {
                                "name": ["yeet"],
                                "email": ["yeet"]
                            },
                            {
                                "name": ["yeet"],
                                "email": ["yeet"]
                            },
                            {
                                "name": ["yeet"],
                                "email": ["yeet"]
                            },
                            {
                                "name": ["yeet"],
                                "email": ["yeet"]
                            },
                            {
                                "name": ["yeet"],
                                "email": ["yeet"]
                            },
                            {
                                "name": ["yeet"],
                                "email": ["yeet"]
                            },
                            {
                                "name": ["yeet"],
                                "email": ["yeet"]
                            },
                            {
                                "name": ["yeet"],
                                "email": ["yeet"]
                            },
                            {
                                "name": ["yeet"],
                                "email": ["yeet"]
                            }
                        ]
                    }
                ],
                "venue": "IT Lounge",
                "description": "World worst brain surgeon giving class on XML."
            } 
        }
    */

    /**
     * Request to POST an event to schedule.
     * Takes in a username paramater as well as an event object.
     */
    app.post('/event', (req, res) => {
        //If no username is passed in the return error message
        if(req.body["userName"] == null){
            res.send("No User Specified");
            return;
        }

        //If no event is passed in the return error message
        if(req.body["event"] == null){
            res.send("No Event Specified");
            return;
        }

        //Get user and event from request body
        let user = req.body["userName"];
        let event = req.body["event"];

        //Construct file path using passed in username
        data_file = './schedules/'+user+'.xml';

        //Attempt to read file with specified username.
        fs.readFile(data_file, 'utf8', (err, data) => {
            if(err){
                //If file does not exist, then invalid user was specified
                if(err.errno == -4058){
                    res.send("User Does Not Exist");
                    return;
                }
                return;
            }

            //Run function to validate passed in event object for minimum requirements
            let status = validateEvent(req.body, data);

            //If function returns anything other that "success" then the specified event is invalid
            if(status != "success"){
                //Send back response message
                res.send("ERROR ADDING EVENT: "+ status);
                return;
            }

            let jsonFile;
            parser.parseString(data, function (err, result) {
                jsonFile = result;
            }); 

            let newEvent = createEvent(req.body.event);
            jsonFile.schedule.event.push(newEvent);
            
            var xml = builder.buildObject(jsonFile);
            fs.writeFile(data_file, xml, (err, data) => {
                if(err){
                    //If file does not exist, then invalid user was specified
                    if(err.errno == -4058){
                        res.send("User Does Not Exist");
                        return;
                    }
                    return;
                }
                return;
            });

            res.json(jsonFile); 
         });
    });

    /**
     * Function to validate an event object for minimum requirements.
     * Takes in a event(data) and a schedule object.
     * If any of the minimum requirements are not met, send back a response message.
     * Event is structured on client side before being posted, thus it asumed events are correct.
     * These are basic checks of only the necessities.
     */
    function validateEvent(data, schedule){
        //First check if ID is specified, it asumed that id is generated and valid on client side.
        if(data.event.id == undefined){
            return "ID not set";
        }
        //Second check to see if ID is correct length, again client will format ID
        if(data.event.id.length != 9){
            return "Invalid ID specified";
        }

        //Variable used to hold return value from function below.
        let returnMessage = "";
        //Parse the passed in schedule and see if event with ID already exists in schedule
        parser.parseString(schedule, function (err, result) {
            for(let existingEvent of result.schedule.event){
                if(data.event.id == existingEvent["$"].id){
                    returnMessage = "ID already exists";
                }
            }
        });
        
        //If event was found with new event ID 
        if(returnMessage != "") return returnMessage;

        //If no title is specified
        if(data.event.title == undefined){
            return "Title not set";
        }
        //Second smaller check to see if title is too long, client side will do validation too
        if(data.event.title.length > 25){

        }

        //Array of valid event types
        let types = ["Event", "Task", "Appointment"];
        //Check if new event type is set and equal to one of the 3 values
        if(data.event.type == undefined || types.indexOf(data.event.type) == -1){
            return "Type not set";
        }

        //Check if date object exists within event
        if(data.event.date == undefined){
            return "Date not set";
        }

        //If repeat is defines, check if it is a valid value
        let repeat = ["Daily", "Weekly", "Monthly"];
        if(data.event.date.repeat != undefined){
            if(repeat.indexOf(data.event.date.repeat) == -1){
                return "Invalid repeat";
            }
        }

        //Check if date has a day value
        if(data.event.date.day == undefined){
            return "Date day not set";
        }
        //Check if valid day is specified and it does not go out of bounds
        if(data.event.date.day > 31 || data.event.date.day < 0){
            return "Invalid date day set";
        }

        //Check if event has month set within date object
        if(data.event.date.month == undefined){
            return "Date month not set";
        }
        //Array of months of year, used to validate if new event month is valid
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if(months.indexOf(data.event.date.month) == -1){
            return "Invalid date month set";
        }

        //Check if event has guests object(can be empty)
        if(data.event.guests == undefined){
            return "Guests not set";
        }
        else{
            
            //Checks if guests exist within guests object and if they do validate them, otherwise if guests are empty then continue

            if(data.event.guests.length != 0){
                if(data.event.guests[0].guest.length > 10){
                    return "Too many guests";
                }

                //If number of guests is fine, loop through every guest and validate them
                for(let guest of data.event.guests[0].guest){
                    //If guest does not have email or name defined then they are invalid
                    if(guest.name == undefined && guest.email == undefined){
                        return "Invalid guest in list";
                    }

                    //Check if name is correct length if it is defined
                    if(guest.name != undefined && guest.name.length > 50){
                        return "Invalid guest in list";
                    }

                    //Check if email is correct length if it is defined
                    if(guest.email != undefined && guest.email.length > 50){
                        return "Invalid guest in list";
                    }
                }
            }
        }

        //If all checks pass then it is assumed that event is correct
        return "success";
    }

    /*
     * Function that takes in a event and converts it into a xml buildable object.
     * It is asumed that event passed is adheres to basic rules of the schema.
     * Only gets called after basic checks are validated.
     */
    function createEvent(data){
        //Extract basic information from event
        let id = data.id;
        let title = data.title;
        let type = data.type;
        let guests = data.guests;

        //Create new date object and populate it with data to match needed structure
        let date = {};

        //get date that was POSTED
        let extractedDate = data.date;

        //First set attribute if it exists, to retain order
        if(extractedDate.repeat != undefined){
            date["$"] = { "repeat": extractedDate.repeat}
        }

        //Because these 2 are needed just extract them
        date["day"] = [ extractedDate.day.toString() ];
        date["month"] = [ extractedDate.month ];

        //If optional parameters are defined addthem to object
        if(extractedDate.startingTime != undefined){
            date["startingTime"] = [ extractedDate.startingTime ];
        }
        if(extractedDate.endingTime != undefined){
            date["endingTime"] = [ extractedDate.endingTime ];
        }

        //Create object with base information, asumed that all of these have validated and is set
        let returnObject = {
            '$': { "id": id },
            "title": [ title ],
            "type": [ type ],
            "date": [ date ],
            "guests": guests,
        }

        //Last 2 optional paramaters, if they are set append them
        if(data.venue != undefined){
            returnObject["venue"] = [ data.venue ];
        }
        if(data.description != undefined){
            returnObject["description"] = [ data.description ];
        }

        return returnObject;
    }

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
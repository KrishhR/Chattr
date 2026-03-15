import cron from 'cron';
import https from 'https';

const url = 'https://chattr-realtime-chat-app.onrender.com/';

const job = new cron.CronJob("*/14 * * * *", () => {
    console.log("Cron triggered at:", new Date().toLocaleTimeString());

    https
        .get(url, (res) => {
            if (res.statusCode === 200) {
                console.log(`Ping successful: ${res.statusCode}`);
            }
            else {
                console.log(`Ping Failed: ${res.statusCode}`);
            }

            res.resume();
        })
        .on('error', (err) => {
            console.error("Ping failed:", err.message);
        })
})

export default job;


/** 
    CRON JOB:

    A cron job is a time-based job scheduler.
    It schedules tasks to run periodically at fixed intervals or at specific times.

    It uses a specific string format (a "cron expression") to define when a task should run.

    Standard Cron Format (5 fields):

    ┌────────────── minute
    │ ┌──────────── hour
    │ │ ┌────────── day of month
    │ │ │ ┌──────── month
    │ │ │ │ ┌────── day of week
    │ │ │ │ │
    * * * * *

    NOTE: Some Node libraries like "node-cron" support an optional seconds field.

    
    PROBLEM: 
    ** The app is hosted on Render. We’re using the free tier on Render. 
    ** Free web services spin down after ~15 minutes of inactivity, and the next request triggers a cold start,
    ** which can take 20–60 seconds.
    ** So, the app takes a lot of time in opening up, bcz Render needs to wake up our services.


    SOLUTION:

    1. Use a "Keep Alive" ping service  
        → Ping the server every 10–14 minutes so it never becomes inactive.
    
    2. Or, move to another hosting service.  X


                                HOW TO PING THE SERVER EVERY 10–14 MINUTES
                                                    /\
                                                   /  \
                                                  /    \
                                                 /      \
                                                /        \
                        1. External Service            2. Internal Method
                        -   A service outside the       - setInterval()
                            Node server sends           - cron libraries (node-cron, cron)
                            requests periodically. 

                        -   Works even if the server
                            is sleeping.

    Preferred Solution: External Service

    If the server instance goes to sleep, any scheduler inside the Node process 
    will also stop running because the application is no longer active.
    Therefore, an external ping service is more reliable.
    
    - But to know more about cron, we would be using cron (Internal way to ping).
 */
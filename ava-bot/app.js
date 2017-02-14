//From: https://docs.botframework.com/en-us/node/builder/overview/

var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//Adding intents, this determines a user's intent.
//you can use LUIS/LuisRecognizer to do some machine learning.
var intents = new builder.IntentDialog();

//=========================================================
// Bots Dialogs
//=========================================================


// Basic Dialogue always returns Hello World.
// bot.dialog('/', function (session) {
//     session.send("Hello World");
// });

//Passing an array of these functions for the dialog handler is a waterfall setup.
//Can chain sequences of these functions passed through as an array to create longer waterfalls.
// bot.dialog('/', [
//     function(session){
//         //Prompts actually waits to elicit a user response.
//         builder.Prompts.text(session, 'Hi! What is your name?');
//     },
//     function(session, results){
//      session.send('Hello %s!', results.response);
//     }
// ])

// bot.dialog('/', [
//     //What is the syntax/meaning of args/next here?
//     function (session, args, next) {
//         if (!session.userData.name) {
//             session.beginDialog('/profile');
//         } else {
//             next();
//         }
//     },
//     function (session, results) {
//         session.send('Hello %s!', session.userData.name);
//     }
// ]);

// bot.dialog('/profile', [
//     function (session) {
//         builder.Prompts.text(session, 'Hi! What is your name?');
//     },
//     function (session, results) {
//         //Stored in user data -- use conversationData/privateConversationData/dialogData
//         //This data is global and will get messy with scale.
//         session.userData.name = results.response;
//         session.endDialog();
//     }
// ]);

bot.dialog('/', intents);

//Why is there an i after change name?
intents.matches(/^change name/i, [
    function (session) {
        session.beginDialog('/profile');
    },
    function (session, results) {
        session.send('Ok... Changed your name to %s', session.userData.name);
    }
]);

intents.onDefault([
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    function (session, results) {
        session.send('Hello %s!', session.userData.name);
    }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);
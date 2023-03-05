const contacts = require('./contacts');
const readline = require('readline');
const { program } = require("commander");

const rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout, 
});


program
.option("-a, --action <type>", "choose action")
.option("-i, --id <type>", "user id")
.option("-n, --name <type>", "user name")
.option("-e, --email <type>", "user email")
.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


const  invokeAction=({ action, id, name, email, phone })=> {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;
    case "get":
        contacts.getContactById(id);
      break;
    case "add":
        contacts.addContact(name, email, phone);
      break;
    case "remove":
        contacts.removeContact(id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);








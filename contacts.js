const path = require('path');
const fs = require('fs').promises;
const contactsPath=path.join('db','contacts.json');



const readFileContacts = async()=>{
  try{
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);     
  } catch (err){
    console.error(err)
  }
}

const writeFileContacts= async(contacts)=>{
  try{
    const data=JSON.stringify(contacts);
    await fs.writeFile(contactsPath,data);      
  } catch (err){
    console.error(err)
  }
}


const listContacts =async()=>{ 
  const contacts = await readFileContacts();   
  console.table (contacts);   
}

const  getContactById = async (contactId)=> {   
  const contacts = await readFileContacts();
  const contact =  contacts.filter((contact)=>contact.id.includes(contactId))
  console.table(contact);  
}

function getRandomId(min, max) {
  return `${Math.floor(Math.random() * max) + min}`
}

const  addContact= async(name, email, phone)=> {
  const newContact ={"id":getRandomId(1,100),"name":`${name}`,"email":`${email}`,"phone":`${phone}`};

  const contacts = await readFileContacts();      
  contacts.push(newContact);

  await writeFileContacts(contacts); 
  console.table (contacts);
} 


const removeContact = async(contactId)=> {
  const newListContacts =[];

  const contacts = await readFileContacts();  

  contacts.map((contact)=> {
    if (contact.id!==contactId){
    newListContacts.push(contact)
    }
  }) 

  await writeFileContacts(newListContacts);
  console.table(newListContacts);
}
  

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact  
};

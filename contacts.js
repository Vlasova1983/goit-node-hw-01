const path = require('path');
const fs = require('fs').promises;
const contactsPath=path.join('db','contacts.json');

const listContacts = async()=>{
  try{
    const data = await fs.readFile(contactsPath)   
    console.table (JSON.parse(data));
  } catch (err){
    console.error(err)
  }
}


const  getContactById = async (contactId)=> {  
  try{
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);    
    const contact = contacts.filter((contact)=>contact.id.includes(contactId))
    console.log(contact);
  } catch (err){
    console.error(err)
  }  
}

const  addContact= async(name, email, phone)=> {
  try{    
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);    
    const contact ={"name":`${name}`,"email":`${email}`,"phone":`${phone}`};
    contacts.push(contact);
    console.table (contacts);
   await fs.writeFile(contactsPath,JSON.stringify(contacts));  
  } catch (err){
  console.error(err)
  }   
} 


const removeContact = async(contactId)=> { 
 try{
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);    
  const newContact =[];
  contacts.map((contact)=> {if (contact.id!==contactId){
    newContact.push(contact)
  }})  
  console.table(newContact);
   await fs.writeFile(contactsPath,JSON.stringify(newContact));   
  } catch (err){
  console.error(err)
  } 
}
  

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact  
};
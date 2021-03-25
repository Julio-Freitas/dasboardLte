/**
 * Data model user
 */
class User {
  constructor({admin,  birth, country, email, gender, name, password, photo,}){
    this._admin = admin;
    this._birth = birth;
    this._country = country;
    this._email = email;
    this._gender = gender;
    this._name = name;
    this._password = password;
    this._photo = photo;
    this._register = new Date()
  }

  get name (){
    return this._name
  }

  get admin (){
    return   this._admin
  }

  get birth (){
    return   this._birth 
  }

  get country (){
    return   this._country
  }

  get email (){
    return   this._email
  }

  get gendern (){
    return   this._gender
  }

  get password (){
    return   this._password
  }

  get photo (){
    return   this._photo
  }

  get register (){
    return   this._register
  }

  
  set name (value){
    this._name = value;
  } 

  set admin (value){   
    this._admin = value;
  }

  set birth (value){   
    this._birth = value; 
  }

  set country (value){
    this._country = value;
  }

  set email (value){  
    this._email = value;
  }

  set gendern (value){
    this._gender = value;
  }

  set password (value){
    this._password = value;
  }

  set photo (value){  
    this._photo = value;
  }

  set register (value){
    this._register = value;
  }


}
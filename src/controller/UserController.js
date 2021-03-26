
/**
 * The controller will bind the model with  the view
 */
class UserController {
  constructor(idForm, idFormUpadate, idTable){
    this.formEl = document.getElementById(idForm);
    this.formUpdateEl = document.getElementById(idFormUpadate);
    this.tableEl = document.getElementById(idTable);
    this._photo = document.getElementById('exampleInputFile');
    this.idTable = idTable;

    this.onSubmit();
    this.onEdit();
    this.onChangePhoto();
  }

  
    onChangePhoto () {
    this._photo.addEventListener('change', event => {
      const file = event.target.files[0];
      const objectURL = window.URL.createObjectURL(file);
      const viewTumbnailPhoto = new UserView();
      viewTumbnailPhoto.updateTumbnail('.thumbnail-image', objectURL);
    })
  }

  getValues(formCurrent) {    
    let user = {}
     const fieldsRequired = ['name', 'email', 'password']
     let sendForm = true;
      [...formCurrent].forEach((field)=> {
          if(fieldsRequired.includes(field.name) && !field.value) {
               sendForm = false
               field.parentNode.classList.add('label-danger')
          }else{         
            field.parentNode.classList.remove('label-danger')
          }
        if(field.name === 'gender' && field.checked) {
         user[field.name] = field.value
        }else if(field.name === 'admin' && field.checked){
           user[field.name] = field.checked
        }else{
          user[field.name] = field.value;
        }
      })

      if(!sendForm) return false;
      const objectUser = new User(user);
      return objectUser;
  }

   onSubmit() {
      this.formEl.addEventListener('submit', async (event)=> {  
      event.preventDefault();
      let btn = this.formEl.querySelector('[type=submit]');
      btn.disabled = true;
      let values = this.getValues(this.formEl);
      if( values) {
          values.photo = await this._setPhoto(this.formEl);       
          this.addLine(values, this.idTable);
          this.formEl.reset();
      }
      btn.disabled = false
    });
  }

onEdit(){

  document.querySelector('#box-user-update .btn-cancel').addEventListener('click', ()=> this.showPanelCreate());

  this.formUpdateEl.addEventListener('submit', async event=> {
      event.preventDefault();
      let btn = this.formEl.querySelector('[type=submit]');
      btn.disabled = true;
      let values =this.getValues(this.formUpdateEl);
      let index = parseInt(this.formUpdateEl.dataset.trIndex);

      if(index === -1) index = index  + 1;        

      const tr = this.tableEl.rows[index];
      const userOld = JSON.parse(tr.dataset.user);
      const result = Object.assign({}, userOld, values);
      if(!values._photo) result._photo = userOld._photo;
      tr.dataset.user = JSON.stringify(result);

      try {         
        const new_photo = await this._setPhoto(this.formUpdateEl);
        if(new_photo !== 'dist/img/avatar5.png') {
          result._photo  = new_photo;
        }else {
          throw Error('error');
        }
      } catch (error) {
        result._photo = userOld._photo;
      }
   

      const data = {
        photo: result._photo, 
        name: result._name,
        email: result._email,
        admin: result._admin ,
        register:dateHelpers.dateFormat(result._register) 
      }

      const view = new UserView()
      tr.innerHTML = view.uptadeTr(data);
      view.addEventsTr(tr);
      this.upadateCount();  
      this.showPanelCreate()    
  })
}

showPanelUpdate() {
    document.getElementById('box-user-created').style.display = 'none';
    document.getElementById('box-user-update').style.display = 'block';
}

showPanelCreate() {
    document.getElementById('box-user-created').style.display = 'block';
    document.getElementById('box-user-update').style.display = 'none';
}

async _setPhoto(form){
  let newPhoto = ""
     try {
      newPhoto = await this.getPhoto(form);
    } catch (error) {
        newPhoto = "dist/img/avatar5.png"
    }
    return newPhoto
}

getPhoto(formCurrent){
    return new Promise((resolve, reject) =>  {
      const fileReader = new FileReader();
      const element = [...formCurrent].find(item => item.name === 'photo')
      const file = element.files[0]
      fileReader.onload = () => resolve(fileReader.result);  
      fileReader.onerror = (erro) => reject(erro)
      fileReader.readAsDataURL(file)
  })
}
  addLine(dataUser, idTable){
    const view = new UserView(dataUser, idTable);
    view.mountTable();
    this.upadateCount();
 }

  upadateCount() {
    let numberUsers = 0;
    let numberAdmin = 0;
    [...this.tableEl.children].forEach(tr => {
      const dataSetUser = JSON.parse(tr.dataset.user);
        if(dataSetUser._admin && dataSetUser._admin !== 'off') {
        numberAdmin ++;
        document.querySelector("#number-admin").innerHTML = numberAdmin
      }else {
        numberUsers ++;
         document.querySelector("#number-users").innerHTML = numberUsers
      }
    });
  }

}
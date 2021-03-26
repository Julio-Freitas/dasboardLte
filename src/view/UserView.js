class UserView {
  constructor(data, idTable) {
    this._user = data;
    this.table = document.getElementById(idTable);
  }
  
  _handleClickEdit(user,sectionRowIndex ) {
    return ()=> {
      document.getElementById('box-user-created').style.display = 'none';
      document.getElementById('box-user-update').style.display = 'block';

      const formUpdate =   document.getElementById('form-user-uptade');
      formUpdate.dataset.trIndex = sectionRowIndex;

      for(let name  in user) {
        let inputEl = formUpdate.querySelector(`[name=${name.replace('_', '')}]`);
        if(inputEl) {
          switch (inputEl.type) {
            case 'file':
              this.updateTumbnail('.thumbnail-image', user[name])
            continue;
            break;
          case 'radio':
            inputEl = formUpdate.querySelector(`[name=${name.replace('_', '')}][value=${user[name]}]`);
            if(inputEl) inputEl.checked = true;
          break
            case 'checkbox':
            inputEl.checked = user[name] === 'off' ? false : user[name]
            break
          default:
              inputEl.value = user[name];
           break;
          }
        
        }
      }
        
    }
  }


  mountTable(){
    const tr = document.createElement('tr');
    tr.dataset.user = JSON.stringify(this._user);
   
          const data = {
                photo: this._user._photo, 
                name:this._user._name,
                email:this._user._email,
                admin:this._user._admin ,
                register:dateHelpers.dateFormat(this._user._register) 
          }
        tr.innerHTML = this.uptadeTr(data)
        this.addEventsTr(tr)
        this.table.appendChild(tr);
  }

 uptadeTr({ photo, name, email, admin, register }) {
    return `
        <td>
          <img src="${ photo }" alt="User Image" class="img-circle img-sm">
        </td>
        <td>${ name  }</td>
        <td>${ email }</td>
        <td>${ admin === 'off' ? 'Não' : 'Sim'}</td>
        <td>${ register }</td>
        <td>
          <button type="button" class="btn btn-primary btn-xs btn-flat btn-edit">Editar</button>
          <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    `
  }

  addEventsTr(tr) {
     tr.querySelector('.btn-edit').addEventListener('click', this._handleClickEdit(this._user,  tr.sectionRowIndex) );
  }


  updateTumbnail(element, src) {
      document.querySelector(element).src = src
  }
}
import Swal from 'sweetalert2';
import { EMAIL_PATTERN } from '../../@core/constants/regex';
import { TYPE_ALERT } from './values.config';

const swalWithBasicOptions = (title:string, html:string) => Swal.mixin({
  title,
  html,
  focusConfirm: false,
  cancelButtonText: 'Cancelar',
  showCancelButton: true,
})

export async function formBasicDialog(title:string, html:string, property:string) {
  return await swalWithBasicOptions(title, html).fire({
    preConfirm: () => {
      const value = ((document.getElementById(property) as HTMLInputElement).value)
      if(value) return value
      Swal.showValidationMessage('Tienes que añadir un genero para poder almacenarlo')
      return
    }
  })
}

export async function userFormBasicDialog(title:string, html:string) {
  return await swalWithBasicOptions(title, html).fire({
    preConfirm: () => {
      let error = ''
      const name = ((document.getElementById('name') as HTMLInputElement).value)
      if(!name) error += ' Usuario es Obligatorio <br>'
      const lastname = ((document.getElementById('lastname') as HTMLInputElement).value)
      if(!lastname) error += ' Apellido es Obligatorio <br>'
      const email = ((document.getElementById('email') as HTMLInputElement).value)
      if(!email) error += ' Correo es Obligatorio '
      // if(!EMAIL_PATTERN.test(email)) error += ' Correo no es correcto '
      const role = ((document.getElementById('role') as HTMLInputElement).value)
      if (error) Swal.showValidationMessage(error)
      return {
        name,
        lastname,
        email,
        role,
        birthday: new Date().toISOString()
      }
    }
  })
}

export async function optionsWithDetails(
    title:string,
    html:string,
    width: number | string,
    confirmButtonText:string = '',
    cancelButtonText: string = ''
  ) {
  return await Swal.fire({
    title,
    html,
    width: `${width}px`,
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonColor: '#6c757d',
    cancelButtonColor: '#dc3545',
    confirmButtonText,
    cancelButtonText,
  }).then((result) => {
    if (result.value) {
      console.log('editar')
      return true
    }else if (result.dismiss.toString() === 'cancel'){
      console.log('bloquear')
      return false
    }
  })
}

export const loadData = (title: string, html: string) => {
  Swal.fire({
    title,
    html,
    timer: 2000,
    timerProgressBar: true,
    onBeforeOpen: () => {
      Swal.showLoading()
    }
  })
}

export const closeAlert = () => {
  Swal.close();
}

export const infoEventAlert = async (title: string, html: string, typeAlert: TYPE_ALERT = TYPE_ALERT.WARNING) => {
  return await Swal.fire({
    title,
    html,
    icon: typeAlert,
    preConfirm: () => {
      return true
    }
  })
}

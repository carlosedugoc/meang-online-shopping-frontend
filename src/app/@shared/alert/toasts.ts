import Swal from 'sweetalert2';
import { TYPE_ALERT } from './values.config';


export function basicAlert(icon:TYPE_ALERT = TYPE_ALERT.SUCCESS, title: string){
  Swal.fire({
    title,
    icon,
    position: 'top-end',
    toast: true,
    showConfirmButton: false,
    width: 400,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
}

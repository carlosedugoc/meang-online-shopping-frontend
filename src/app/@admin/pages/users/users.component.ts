import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/result-data.interface';
import { DocumentNode } from 'graphql';
import { USERS_LIST } from '@graphql/operations/query/user';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { optionsWithDetails, userFormBasicDialog } from '@shared/alert/alert';
import { UsersAdminService } from './users-admin.service';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { basicAlert } from '@shared/alert/toasts';
import { TYPE_ALERT } from '@shared/alert/values.config';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public query: DocumentNode = USERS_LIST;
  public context: object = {};
  public itemsPage: number = 10;
  public resultData: IResultData = { listKey: 'users', definitionKey: 'users' };
  public include: boolean = true
  public columns: Array<ITableColumns> = [
    {property: 'id', label: '#'},
    {property: 'name', label: 'Nombre'},
    {property: 'lastname', label: 'Apellido'},
    {property: 'email', label: 'Correo'},
    {property: 'role', label: 'Permisos'}
  ]

  constructor(private service:UsersAdminService) { }

  ngOnInit(): void {
  }

  private initializeForm(user:any) {
    const defaultName = user?.name || ''
    const defaultLastName = user?.lastname || ''
    const defaultEmail = user?.email || ''
    const roles = new Array(2)
    roles[0] = user?.role && user.role === 'ADMIN' ? 'selected' : ''
    roles[1] = user?.role && user.role === 'CLIENT' ? 'selected' : ''
    return `
    <input placeholder="Nombres" id="name" value="${defaultName}" class="swal2-input" required/>
    <input placeholder="Apellidos" id="lastname" value="${defaultLastName}" class="swal2-input" required/>
    <input placeholder="Correo Electrónico" id="email" value="${defaultEmail}" class="swal2-input" required/>
    <select id="role" class="swal2-input" >
      <option value="ADMIN" ${roles[0]}>Administrador</option>
      <option value="CLIENT" ${roles[1]}>Cliente</option>
    </select>
    `
  }

  private async addForm(html:string) {
    const addResult = await userFormBasicDialog('Añadir usuario', html)
    console.log(addResult)
    this.addUser(addResult)
  }
  private async updateForm(html:string, user:any) {
    const addResult = await userFormBasicDialog('Modificar usuario', html)
    console.log(addResult)
    this.updateUser(addResult, user.id)
  }

  public async takeAction($event) {
    const [action, user] = $event
    const html = this.initializeForm(user)
    switch (action) {
      case 'add': return this.addForm(html)
      case 'edit': return this.updateForm(html, user)
      case 'info':
        const infoResult = await optionsWithDetails('Detalles', `${user.name} ${user.lastname}
          <br><i class="fas fa-envelope-open-text me-2"></i> ${user.email}`, 400,
          '<i class="fas fa-edit"></i> Editar',
          '<i class="fas fa-lock"></i> Bloquear'
        )
        if(infoResult) this.updateForm(html, user)
        else if (infoResult === false) this.blockForm(user)
        break;
      case 'block':return this.blockForm(user)
      default: break;
    }
  }

  private addUser(result){
    if (result.value) {
      const user:IRegisterForm = result.value
      user.password = '1234'
      user.active = false
      this.service.register(user).subscribe((res:any)=>{
        console.log(res)
        if(res) return basicAlert(TYPE_ALERT.SUCCESS, res.message)
        return basicAlert(TYPE_ALERT.WARNING, res.message)
      })
    }

  }

  private updateUser(result, id:string){
    if (result.value) {
      const user = result.value
      user.id = id
      this.service.update(result.value).subscribe((res:any)=>{
        console.log(res)
        if(res) return basicAlert(TYPE_ALERT.SUCCESS, res.message)
        return basicAlert(TYPE_ALERT.WARNING, res.message)
      })
    }

  }

  private blockUser(id:string) {
    this.service.block(id).subscribe((res:any)=>{
      if(res) return basicAlert(TYPE_ALERT.SUCCESS, res.message)
      return basicAlert(TYPE_ALERT.WARNING, res.message)
    })
  }

  private async blockForm(user:any) {
    const result = await optionsWithDetails(
      '¿Bloquear?',
      'Si bloqueas el usuario seleccionado, no se mostrará en la lista', 500,
      'No, no bloquear',
      'Si, bloquear'
    );
    if (result === false) this.blockUser(user.id)
  }

}

import { Component, OnInit } from '@angular/core';
import { IResultData } from '../../../@core/interfaces/result-data.interface';
import { DocumentNode } from 'graphql';
import { GENRES_LIST } from '@graphql/operations/query/genre';
import { ITableColumns } from '../../../@core/interfaces/table-columns.interface';
import { formBasicDialog, optionsWithDetails } from '@shared/alert/alert';
import { GenresService } from './genres.service';
import { basicAlert } from '../../../@shared/alert/toasts';
import { TYPE_ALERT } from '@shared/alert/values.config';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  public query: DocumentNode = GENRES_LIST;
  public context: object;
  public itemsPage: number;
  public resultData: IResultData;
  public columns: Array<ITableColumns> = undefined;

  constructor(private service: GenresService) { }

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 10;
    this.resultData = { listKey: 'genres', definitionKey: 'genres' };
    this.columns = [
      {property: 'id', label: '#'},
      {property: 'name', label: 'Nombre del género'},
      {property: 'slug', label: 'slug'},
    ]
  }

  public async takeAction($event) {
    const [action, genre] = $event
    const defaultValue = genre?.name || ''
    const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`
    switch (action) {
      case 'add': return this.addForm(html)
      case 'edit': return this.updateForm(html, genre)
      case 'info':
        const infoResult = await optionsWithDetails('Detalles', `${genre.name} (${genre.slug})`, 400,
          '<i class="fas fa-edit"></i> Editar',
          '<i class="fas fa-lock"></i> Bloquear'
        )
        if(infoResult) this.updateForm(html, genre)
        else if (infoResult === false) this.blockForm(genre)
        break;
      case 'block':return this.blockForm(genre)
      default: break;
    }
  }

  private addGenre(result) {
    if (result.value){
      this.service.add(result.value).subscribe((res:any)=>{
        console.log(res)
        if(res) return basicAlert(TYPE_ALERT.SUCCESS, res.message)
        return basicAlert(TYPE_ALERT.WARNING, res.message)
      })
    }
  }

  private updateGenre(id:string, result) {
    if (result.value){
      this.service.update(result.value, id).subscribe((res:any)=>{
        console.log(res)
        if(res) return basicAlert(TYPE_ALERT.SUCCESS, res.message)
        return basicAlert(TYPE_ALERT.WARNING, res.message)
      })
    }
  }


  private blockGenre(id:string) {
    if (id){
      this.service.block(id).subscribe((res:any)=>{
        if(res) return basicAlert(TYPE_ALERT.SUCCESS, res.message)
        return basicAlert(TYPE_ALERT.WARNING, res.message)
      })
    }
  }

  private async blockForm(genre:any) {
    const result = await optionsWithDetails(
      '¿Bloquear?',
      'Si bloqueas el item seleccionado, no se mostrará en la lista', 500,
      'No, no bloquear',
      'Si, bloquear'
    );
    if (result === false) this.blockGenre(genre.id)
  }

  private async addForm(html:string) {
    const addResult = await formBasicDialog('Añadir género', html, 'name')
    this.addGenre(addResult)
  }

  private async updateForm(html:string, genre:any) {
    let resultUpdate = await formBasicDialog('Editar género', html, 'name')
    this.updateGenre(genre.id, resultUpdate)
  }

}

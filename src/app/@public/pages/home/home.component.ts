import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { UsersService } from '../../../@core/services/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private usersService: UsersService, private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.login('carlosedugoc6@gmail.com', '123456').subscribe(res =>{
      console.log(res)
    })
    this.usersService.getUsers().subscribe(res=>{
      console.log(res)
    })
    // this.auth.getMe().subscribe(res=>{
    //   console.log(res)
    // })
  }

}

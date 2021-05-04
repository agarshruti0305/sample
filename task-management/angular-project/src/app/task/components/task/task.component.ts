import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
user='';
  constructor(private authSevice: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authSevice.idTokenClaims$.subscribe((res)=> {
      console.log(res);
      localStorage.setItem("token",res.__raw);
      localStorage.setItem("user",res.email);
      this.user = res.email;
      this.router.navigateByUrl('task/task-list');
    });
    this.authSevice.error$.subscribe((error)=> {
      console.log(error);    })
  }
  logOut() {
  
      this.authSevice.logout();
      localStorage.clear();
    sessionStorage.clear();
    }
  }




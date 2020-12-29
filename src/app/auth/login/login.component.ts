import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  erorrMessage:string;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router:Router
    ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  onSubmit():void{
    this.erorrMessage=null;

    const username = this.formGroup.value.username;
    const password = this.formGroup.value.password;

    this.authService.login(username,password).pipe(
      take(1)
    ).subscribe( response =>{
      if(!response){
        this.erorrMessage = "Invalid username, or password";
        return
      }

      this.authService.setLoggedUser(response);
      this.router.navigate(['jobs']);
    })
  }
  private buildForm():void {
    this.formGroup = this.fb.group({
      username: ['',[Validators.required]],
      email: ['',Validators.required],
      password: ['',Validators.required],
    });
  }

}

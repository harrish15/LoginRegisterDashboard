import { Component, OnInit } from "@angular/core";
import { Ilogin } from "../shared/model/login";
import { Validator, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginRegisterServices } from "../shared/services/login.user";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public Login: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginServices: LoginRegisterServices,
    private router: Router
  ) {}

  ngOnInit() {
    this.Login = this.fb.group({
      UserLogin: this.fb.group({
        UserName: ["", [Validators.required]],
        Password: ["", [Validators.required]]
      })
    });
  }
  LoginUser(data: Ilogin) {
    console.log(data);
    this.loginServices.postuserLogin(data).subscribe((item: Ilogin) => {
      let response: any = item;
      localStorage.setItem("token", response.token);
      alert("Login Successful");
      this.router.navigateByUrl("/dashboard");
    });
  }
}

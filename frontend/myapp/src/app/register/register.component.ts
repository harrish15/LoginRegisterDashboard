import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Iregistration } from "../shared/model/registration";
import { Ilogin } from "../shared/model/login";
import { Regx } from "./regx";
import { LoginRegisterServices } from "../shared/services/login.user";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  public submitted: boolean = false;
  public userForm: FormGroup;
  public userData: string;
  constructor(
    private FB: FormBuilder,
    private lr: LoginRegisterServices,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.FB.group({
      FirstName: [""],
      LastName: [""],
      MobileNo: [""],
      EmailId: [""],
      UserLogin: this.FB.group({ UserName: [""], Password: [""] })
    });
  }
  Save(data: Iregistration) {
    this.submitted = true;
    if (!this.userForm.valid) {
      return;
    }
    console.log(data);
    // this.userData = JSON.stringify(data);
    this.lr.postUserRegistration(data).subscribe((item: Iregistration) => {
      console.log(item);
      let response: any = item;
      if (response == true) {
        this.router.navigateByUrl("/login");
      } else if (response.Error != undefined) {
        alert(response.Error);
      }
    });
  }
}

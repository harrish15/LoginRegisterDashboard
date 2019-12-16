import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Ilogin } from "../model/login";
import { Iregistration } from "../model/registration";
import { Observable, config } from "rxjs";

@Injectable({ providedIn: "root" })
export class LoginRegisterServices {
  private loginEndpoint: string = "http://localhost:4003/api/user";
  private postsUserRegistrationUrl: string =
    "http://localhost:4003/api/auth/newUser";

  public headers1: HttpHeaders;
  public headers2: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.headers2 = new HttpHeaders({
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("x-auth-token")
    });
  }
  postuserLogin(item: Ilogin): Observable<Ilogin> {
    // console.log("services  " + localStorage.getItem("x-auth-token"));
    return this.http.post<Ilogin>(this.loginEndpoint, JSON.stringify(item), {
      headers: this.headers2
    });
  }
  postUserRegistration(data: Iregistration): Observable<Iregistration> {
    console.log(data);
    // let userData = JSON.stringify(data);
    return this.http.post<Iregistration>(this.postsUserRegistrationUrl, data, {
      headers: this.headers1
    });
  }
}

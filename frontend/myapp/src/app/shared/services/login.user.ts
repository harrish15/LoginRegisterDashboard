import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Ilogin } from "../model/login";
import { Iregistration } from "../model/registration";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class LoginRegisterServices {
  private loginEndpoint: string = "http://localhost:4003/api/user";
  private postsUserRegistrationUrl: string =
    "http://localhost:4003/api/auth/newUser";

  public headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
  }
  postuserLogin(item: Ilogin): Observable<Ilogin> {
    return this.http.post<Ilogin>(this.loginEndpoint, JSON.stringify(item), {
      headers: this.headers
    });
  }
  postUserRegistration(data: Iregistration): Observable<Iregistration> {
    console.log(data);
    // let userData = JSON.stringify(data);
    return this.http.post<Iregistration>(this.postsUserRegistrationUrl, data, {
      headers: this.headers
    });
  }
}

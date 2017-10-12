import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { URLSearchParams, QueryEncoder } from "@angular/http";

import {
    getBoolean,
    setBoolean,
    getNumber,
    setNumber,
    getString,
    setString,
    hasKey,
    remove,
    clear
} from "application-settings";

import { Base64 } from './commonLib';

@Injectable()
export class RestApiService {
  auth = '';
  deviceKey = '';
  token = '';
  appId = '';
  userId = '';
  APP_URL = 'https://apps-test.applozic.com';

  public isTurnedOn: boolean;
  public account = {
      "appId" : '',
      "userId": '',
      "pwd": ''
  }

  constructor(private http: Http) {}

  login(data): Observable<any> {
    let headers = new Headers({'Accept': 'application/json','Content-Type': 'application/json','Application-Key': this.appId});
    let options = new RequestOptions({ headers: headers});
  
    console.log("http request for login");
    console.log(data.appId+" "+data.userId +" "+ data.pwd);
    this.appId = data.appId;
    this.userId = data.userId;
    this.token = data.pwd;
    return this.http.post(
      this.APP_URL + '/v2/tab/initialize.page',
     {
      applicationId: this.appId,
      userId: this.userId,
      password: data.pwd,
      enableEncryption: true,
      displayName:'',
      contactNumber:'',
      appVersionCode: 108,
      authenticationTypeId: 1
      },options
    ).map(res => <any>res.json());
  }

  

  convoList(data): Observable<any> {
  
    this.isTurnedOn = getBoolean("isTurnedOn");
    if(this.isTurnedOn){
      console.log("Account Settings moved");
      this.account = JSON.parse(getString("account"));
      console.dir(this.account);
      this.appId = this.account.appId;
      this.userId = this.account.userId;
      this.token = this.account.pwd;
    }

    let enc = this.userId+':'+data.devKey;
    this.auth = Base64.encode(enc);
    this.deviceKey = data.devKey;
    let headers = new Headers({'Accept': 'application/json','Content-Type': 'application/json',
                                'UserId-Enabled': true,'Application-Key': this.appId,'Access-Token': this.token,
                              'Device-Key':this.deviceKey,'Authorization': 'Basic '+this.auth});
    let options = new RequestOptions({ headers: headers});
    let reqData = '';
    if(data.endTime){
      reqData += '&endTime='+data.endTime;
    }
    reqData += '&mainPageSize=60';
    console.log("http request for convoList");
    console.log(this.deviceKey+" "+this.auth);
    return this.http.get(this.APP_URL + '/rest/ws/message/list'+'?startIndex=0'+reqData,options)
    .map(res => <any>res.json());
  }

  chat(data): Observable<any> {
    let headers = new Headers({'Accept': 'application/json','Content-Type': 'application/json',
                                'UserId-Enabled': true,'Application-Key': this.appId,'Access-Token': this.token,
                              'Device-Key':this.deviceKey,'Authorization': 'Basic '+this.auth});
    let options = new RequestOptions({ headers: headers});
    let reqData = '';
    reqData += "&" +data.id + "=" +data.whose;
    if(data.endTime){
      reqData += '&endTime='+data.endTime;
    }
    reqData += '&pageSize=30';
    return this.http.get(this.APP_URL + '/rest/ws/message/list'+'?startIndex=0'+reqData,options)
    .map(res => <any>res.json());
  }

  send(data): Observable<any> {
    let headers = new Headers({'Accept': 'application/json','Content-Type': 'application/json',
                                'UserId-Enabled': true,'Application-Key': this.appId,'Access-Token': this.token,
                              'Device-Key':this.deviceKey,'Authorization': 'Basic '+this.auth});
    let options = new RequestOptions({ headers: headers});    
    return this.http.post(
      this.APP_URL + '/rest/ws/message/send',
     {
        contentType:0,
        // key:"sd4py",
        message:data.message,
        metadata:{},
        source:5,
        to:data.whose,
        type:5
      },options
    ).map(res => <any>res.json());
  }

  startNew(): Observable<any> {
    let headers = new Headers({'Accept': 'application/json','Content-Type': 'application/json',
                                'UserId-Enabled': true,'Application-Key': this.appId,'Access-Token': this.token,
                              'Device-Key':this.deviceKey,'Authorization': 'Basic '+this.auth});
    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.APP_URL + '/rest/ws/user/filter?startIndex=0&pageSize=30&orderBy=1',options)
    .map(res => <any>res.json());
  }

  createGroup(data): Observable<any> {
    let headers = new Headers({'Accept': 'application/json','Content-Type': 'application/json',
                                'UserId-Enabled': true,'Application-Key': this.appId,'Access-Token': this.token,
                                'ofUserId':data.adminId,
                              'Device-Key':this.deviceKey,'Authorization': 'Basic '+this.auth});
    let options = new RequestOptions({ headers: headers});    
    return this.http.post(
      this.APP_URL + '/rest/ws/group/v2/create',
     {
        groupName : data.groupName,
        groupMemberList : data.members,
      },options
    ).map(res => <any>res.json());
  }

 deleteMessage(data): Observable<any> {
    let headers = new Headers({'Accept': 'application/json','Content-Type': 'application/json', 'key': data.key,
                                'UserId-Enabled': true,'Application-Key': this.appId,'Access-Token': this.token,
                              'Device-Key':this.deviceKey,'Authorization': 'Basic '+this.auth});
    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.APP_URL + '/rest/ws/message/delete',options)
    .map(res => <any>res.json());
  }

  deleteConversation(data): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json',
                                'UserId-Enabled': true,'Application-Key': this.appId,'Access-Token': this.token,
                              'Device-Key':this.deviceKey,'Authorization': 'Basic '+this.auth});
    let reqData = '';
    reqData += "?" +data.id + "=" +data.whose;
    let options = new RequestOptions({ headers: headers});
    console.log(this.appId +" "+ " "+this.token+" "+this.deviceKey+" "+this.auth);
    return this.http.get(this.APP_URL + '/rest/ws/message/delete/conversation'+reqData,options)
    .map(res => res);
  }

  addMember(data): Observable<any> {
    let headers = new Headers({'Accept': 'application/json','Content-Type': 'application/json',
                                'UserId-Enabled': true,'Application-Key': this.appId,'Access-Token': this.token,
                                'ofUserId':data.adminId,
                              'Device-Key':this.deviceKey,'Authorization': 'Basic '+this.auth});
    let options = new RequestOptions({ headers: headers});    
    return this.http.post(
      this.APP_URL + '/rest/ws/group/add/member',
     {
        userId:this.userId,
        clientGroupId:data.clientGroupId
      },options
    ).map(res => <any>res.json());
  }

  removeMember(data): Observable<any> {
    let headers = new Headers({'Accept': 'application/json','Content-Type': 'application/json',
                                'UserId-Enabled': true,'Application-Key': this.appId,'Access-Token': this.token,
                                'ofUserId':data.adminId,
                              'Device-Key':this.deviceKey,'Authorization': 'Basic '+this.auth});
    let options = new RequestOptions({ headers: headers});    
    return this.http.post(
      this.APP_URL + '/rest/ws/group/remove/member',
     {
        userId:this.userId,
        clientGroupId:data.clientGroupId
      },options
    ).map(res => <any>res.json());
  }

 handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}
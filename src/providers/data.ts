import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Data {
 
    data: any;
 
    constructor(public http: Http) {
 
    }
 
   //  createReview(review){
 
	  //   // let headers = new Headers();
	  //   // headers.append('Content-Type', 'application/json');
	 
	  //   this.http.post('http://localhost:3000/', review)
	  //     .subscribe(res => {
	  //       console.log(res.json());
	  //     });
	 
	  // }

 createReview(result){
 
    this.http.post('http://localhost:3000/api/results', result)
      .subscribe(res => {
        console.log(res.json());
      });
 
  }


    load(){
 
        if(this.data){
            return Promise.resolve(this.data);
        }
 
        return new Promise(resolve => {
 
            this.http.get('assets/data/questions.json').map(res => res.json()).subscribe(data => {
                this.data = data.questions;
                resolve(this.data);
            });
 
        });
 
    }
 
}
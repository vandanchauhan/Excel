import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Data } from '../../providers/data';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('slides') slides: any;
 
    hasAnswered: boolean = false;
    score: number = 0;
    total: number = 0 ;
    ptotal: number = 0 ;
    ctotal: number = 0 ;
    mtotal: number = 0 ;
    Physics: number = 0;
    Chemistry: number = 0;
    Maths: number = 0;
    nPhysics: number = 0;
    nChemistry: number = 0;
    nMaths: number = 0;
    pPhysics1: number = 0;
    pChemistry1: number = 0;
    pMaths1: number = 0;
 	subj:String;
    slideOptions: any;
    questions: any;
	name:String;
	rollno: number = 0 ;
	type:String;

	public data = [];

    constructor(public navCtrl: NavController, public dataService: Data, public toastCtrl: ToastController) {
 
    }

    ionViewDidLoad() {
 		 console.log(this.score);
 		 this.type = "a";		
        this.slides.lockSwipes(true);
 


        this.dataService.load().then((data) => {
 
            data.map((question) => {
 
                let originalOrder = question.answers;
                question.answers = this.randomizeAnswers(originalOrder);
                return question;
 
            });     
 
            this.questions = data;
 
        });
 
    }

    submit() {
    	if(this.name == null) {
    		alert("Please enter the details!!");	
    	}
    	else {
    		this.slides.lockSwipes(false);
	        this.slides.slideNext();
	        this.slides.lockSwipes(true);
	    	this.data.push(this.name);
	    	this.data.push(this.rollno);
	    	console.log(this.data);
    	}																																																									;
    }

    submit2() {
    	if(this.type == null) {
    		alert("Please enter the details!!");	
    	}
    	else {
	    	this.slides.lockSwipes(false);
	        this.slides.slideNext();
	        this.slides.lockSwipes(true);
	    	this.data.push(this.type);
	 	   	console.log(this.data);
	 	}	   	
    }

    finalsubmit() {
    	this.data.push(this.ptotal);
    	this.data.push(this.ctotal);
    	this.data.push(this.mtotal);
    	this.data.push(this.total);
    	console.log(this.data);
    	this.dataService.createReview(this.data);  
    	this.slides.lockSwipes(false);
	    this.slides.slideNext();
	    this.slides.lockSwipes(true);
    }

	slideChanged() {
	    let currentIndex = this.slides.getActiveIndex();
	    console.log('Current index is', currentIndex);
	    if(3 <= currentIndex && currentIndex <= 5) {
	    	console.log("Physics");
	    	this.subj = "p";
	    }
	    if(6 <= currentIndex && currentIndex <= 8) {
	    	console.log("Chemistry");
	    	this.subj = "c";
	    }
	    if(9 <= currentIndex && currentIndex <= 11 ) {
	    	console.log("Maths");
	    	this.subj = "m";
	    }
	  }

	optionsFn() {
	  	console.log(this.subj);
	  	if(this.subj == "p") {
  			this.slides.lockSwipes(false);
	        this.slides.slideTo(3, 1000);
	        this.slides.lockSwipes(true);
	  	}
	  	if(this.subj == "c") {
  			this.slides.lockSwipes(false);
	        this.slides.slideTo(6, 1000);
	        this.slides.lockSwipes(true);
	  	}
	  	if(this.subj == "m") {
  			this.slides.lockSwipes(false);
	        this.slides.slideTo(9, 1000);
	        this.slides.lockSwipes(true);
	  	}
	}

    nextSlide(){
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    }

 	tosubmit() {
        this.slides.lockSwipes(false);
        this.slides.slideTo(12, 1000);
        this.slides.lockSwipes(true);
    }

    tophy() {        
    	this.slides.lockSwipes(false);
        this.slides.slideTo(3, 1000);
        this.slides.lockSwipes(true);
    }

    tochem() {
        // this.score = 0;
        this.slides.lockSwipes(false);
        this.slides.slideTo(6, 1000);
        this.slides.lockSwipes(true);
    }

    tomaths() {
        // this.score = 0;
        this.slides.lockSwipes(false);
        this.slides.slideTo(9, 1000);
        this.slides.lockSwipes(true);
    }

    prevSlide(){
        this.slides.lockSwipes(false);
        // this.slides.slideTo(i-1);
        this.slides.slidePrev();
        this.slides.lockSwipes(true);
    }
 
    selectAnswer(answer, question){
 		console.log(question.subject);
        this.hasAnswered = true;
        answer.selected = true;
        // question.flashCardFlipped = true;

        if(answer.correct  && question.subject === 'Physics'){
            this.Physics++;
            this.score++;  
        }

        if(answer.correct && question.subject === 'Chemistry'){
            this.Chemistry++;
            this.score++;     
        }

        if(answer.correct && question.subject === 'Maths'){
            this.Maths++;    
            this.score++; 
        }

        if(!answer.correct  && question.subject === 'Physics'){
            this.nPhysics++;
            // this.nphysics1 = this.nPhysics*-1;
          //  this.score++;    
        }

        if(!answer.correct && question.subject === 'Chemistry'){
            this.nChemistry++;
            // this.nchemistry1 = this.nChemistry*-1;
         //   this.score++;     
        }

        if(!answer.correct && question.subject === 'Maths'){
            this.nMaths++;    
            // this.nmaths1 = this.nMaths*-1;
         //   this.score++; 
        }      
 		
        this.total = this.score*4 - this.nPhysics - this.nChemistry - this.nMaths;
        this.ptotal = this.Physics*4 - this.nPhysics;
        this.ctotal = this.Chemistry*4 - this.nChemistry;
        this.mtotal = this.Maths*4 - this.Maths;

        let toast = this.toastCtrl.create({
		    message: `Saved`,
		    duration: 2000
		});
		toast.present();

        setTimeout(() => {
            this.hasAnswered = false;
            // this.nextSlide();
            answer.selected = false;
            // question.flashCardFlipped = false;
        }, 500);
    }
 
    randomizeAnswers(rawAnswers: any[]): any[] {
 
        for (let i = rawAnswers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = rawAnswers[i];
            rawAnswers[i] = rawAnswers[j];
            rawAnswers[j] = temp;
        }
 
        return rawAnswers;
 
    }
 
  //   restartQuiz() {
	 //    console.log(this.score);
		// console.log(this.Chemistry);
		// console.log(this.Maths);   
  //   }

}
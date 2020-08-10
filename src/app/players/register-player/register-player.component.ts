import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlayerDetailsComponent } from '../player-details/player-Details.component';
import { Player } from 'src/app/model/player';
import { NgForm } from '@angular/forms';
import { PlayerService } from 'src/app/player.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-register-player',
  templateUrl: './register-player.component.html',
  styleUrls: ['./register-player.component.css']
})
export class RegisterPlayerComponent implements OnInit {
  player : Player = new Player();
  id: number;
  userForm: NgForm;
  //isSubmitted: boolean = false;
  imgURL: any;
  receivedImageData: any;
  convertedImage: any;
  base64Data: any;
  public selectedFile: File;
  public statusMessage: string = "";
  public event;

  constructor(private playerService: PlayerService, private router: Router,
    private _snackbar:MatSnackBar){ }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.playerService.registerPlayer(null).subscribe(
      data => {
        this.id = data.id;
        console.log("player1 : " + data.id);
        this._snackbar.open("Player " + this.id + " registered successfully!!!",'',
        {duration: 3000,
        verticalPosition: 'top'});
        this.router.navigate(['/players',this.id]);
      },
      error => console.log(error));
    //this.isSubmitted = true;
  }
  onSubmit1(){
    let formData:FormData = new FormData();
/* if(file !== null){
  formData.append('uploadFile', file, file.name);
  console.log("fileName :" + file.name);
  console.log("fileName :" + file.size);
}*/if(!isNullOrUndefined(this.selectedFile)){
  console.log("entered here");
  formData.append('uploadFile', this.selectedFile);
  formData.append('info', JSON.stringify(this.player));
}else{
  formData.append('info', JSON.stringify(this.player));
}
    /*formData.append('info', new Blob([JSON.stringify(this.player)],
    {
        type: "application/json"
    }));*/

    //console.log(file.size);

    //let headers = new Headers();
    //headers.append('Accept', 'application/json');
    this.playerService.registerPlayer(formData).subscribe(
      data =>{
        this.id = data.id;
        console.log("player1 : " + data.id);
        this._snackbar.open("Player " + this.id + " registered successfully!!!",'',
        {duration: 3000,
        verticalPosition: 'top'});
        this.router.navigate(['/players',this.id]);
      }
      ,
      (error) => {
        this.statusMessage = "Unable to register user, please check logs for more details!!"
        console.log(error)
      }
    )
  }

  public onFileChanged(event){
    console.log("event: " + event);
    const file = event.target.files[0];
    //let file1 = file.value.replace("C:\\fakepath\\", "");
    //console.log("file1 :" + file1);
    this.selectedFile = file;  
    //this.selectedFile = event.target.files[0];
    //const uploadData = new FormData();
    //uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    // if (file.type.match('image.*')) {  
    //   var size = event.target.files[0].size;  
    //   if(size > 1000000)  
    //   {  
    //       alert("size must not exceeds 1 MB");  
    //       //this.player.photo="";  
    //   }  
    //   else  
    //   {  
    //     this.selectedFile = event.target.files[0];  
    //   }  
    // } else {  
    //   alert('invalid format!');  
    // }  
    //Below is used to display the image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL=reader.result;
    };
  }



  //This is for uploading
  /* onUpload(){
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    this.playerService.uploadFile(uploadData).subscribe(
      res => {
        console.log(res);
        this.receivedImageData=res;
        this.base64Data=this.receivedImageData;
        this.convertedImage='data:image/jpeg;base64,' + this.base64Data;
      },
      err => console.log('Error Occured duringng saving: ' + err)
    );
  } */
  }

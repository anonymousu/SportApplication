import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/model/player';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  player: Player;
  private id: number;
  choice: boolean;
  photo:String = 'assets/img/img1.jpg';
  img: any;
  statusMessage: String = "Loading Data...";

  showImages() {
    //this.img = toBase64String(this.player.photo);
    let reader = new FileReader();
    reader.readAsDataURL(this.player.photo);
    reader.onload = (event2) => {
    };
  }

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, 
              private playerService: PlayerService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => 
      {this.id = +params.get('id');
       });
    /* let id: number = this.activatedRoute.snapshot.params['id']; */
    this.playerService.getPlayer(this.id).subscribe(
      (playerData) => {
        if(playerData == null){
          this.statusMessage =  'No Player with the specified Id exists.';
      }else{
      this.player=playerData;
      }
    },
    (error) => {this.statusMessage = 'No Player with the specified Id exists.';
    console.log(error);})    
  } 

//  refreshPlayerList(){
//    this.playerService.getPlayerList
//  }
deletePlayer(playerId: number){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '500px',
    panelClass: 'confirm-dialog-container',
    disableClose: true,
    position: {top: "10px" },
    data: {
      title: "Are you sure to delete this record?",
      message: "You are about to delete the player"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => 
   {console.log(dialogResult);
   if(dialogResult){
     console.log("Deletion in progress");
     this.playerService.deletePlayer(playerId).subscribe(
       (data) => {
         console.log(data);
         this._snackBar.open("Player ID " + playerId + " deleted Successfully!!!",'',{
           duration: 3000,
           verticalPosition: 'top'
          });
         this.router.navigate(['/players']);
      },
       (error) => {console.log(error);}
     );
   }
   else{
     console.log("Failed to delete");
   }
  }
  );
   
}
}

import { Component, OnInit } from '@angular/core';
import { Player } from '../model/player';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../player.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.css']
})
export class UpdatePlayerComponent implements OnInit {
  player: Player;
  id: number;
  isSubmitted: boolean = false;
  imgURL: any;
  public selectedFile: File;

  constructor(private activatedRoute: ActivatedRoute, private playerService: PlayerService,
  private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.id = +params.get('id');
      });
      this.playerService.getPlayer(this.id).subscribe(
        playerData => {
          this.player=playerData;
        });

  }
  public onFileChanged(event){
    console.log("event: " + event);
    const file = event.target.files[0];
    this.selectedFile = file;  
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL=reader.result;
    };
  }

  updatePlayer(playerId: number){
    this.playerService.updatePlayer(this.id, this.player).subscribe(
      data => console.log("Data:" + data), error => console.log("error: " + error)
    );
    this.isSubmitted = true;
    this._snackbar.open("Updated Successfully!!",'',
    {
      duration: 3000,
      verticalPosition: 'top'
    }) 

  }

}

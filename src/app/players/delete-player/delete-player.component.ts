import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Player } from 'src/app/model/player';
import { isNullOrUndefined, isNull } from 'util';
import { ControlContainer } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-delete-player',
  templateUrl: './delete-player.component.html',
  styleUrls: ['./delete-player.component.css']
})
export class DeletePlayerComponent implements OnInit {

  public dataSource: MatTableDataSource<Player>;
  players: Player[];
  changed: boolean = false;
  selectedValue: String = "id";
  userid: number;
  statusMessage: string ="";
  selectedIds : any[] = [];
  url: string;

  displayedColumns: string[] = ['check','id','userName', 'firstName', 'lastName', 'email'];

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, 
    private playerService: PlayerService, private _snackBar: MatSnackBar, private router: Router) { }

    retrieve(event: any,selectedValue: String){
      console.log("event entered :" + event.target.value);
      console.log("selected Value :" + selectedValue);
      //this.dataSource.filter = event.target.value.trim().toLowerCase();
      //this.router.navigate(['/players',event.target.value]);
     if(selectedValue === 'id'){
      //this.router.navigate(['players',event.target.value]);
      console.log('id: ' + event.target.value + "selected value is id");
      this.playerService.getPlayerById(event.target.value).subscribe(
        res => {
          if(isNullOrUndefined(res)){
            this.statusMessage = 'No such Id exists!!!';
            (error) => this.statusMessage = 'No such userName exists!!!';
        }else{
           this.playerService.getPlayerById(event.target.value).subscribe(
            res => {if(!isNullOrUndefined(res)){
              this.changed=true;
              console.log("getPlayerById" + res);
              this.dataSource = new MatTableDataSource(res);
              this.players = res;
            }
            }
            );
          //console.log("Players id:" + data.id);
          //this.userid = data.id;
          //this.router.navigate(['players',this.userid]);
        }         
        },
        (error) => {this.statusMessage = 'No such userName exists!!!';
        console.log(error);}  
        );
      }
      else if(selectedValue === 'userName'){
        //console.log("event is: " + event);
        console.log("username is: " + event.target.value);
        this.playerService.getPlayerByname(event.target.value).subscribe(
          data => {
            if(isNullOrUndefined(data)){
              this.statusMessage = 'No such userName exists!!!';
              (error) => this.statusMessage = 'No such userName exists!!!';
          }else{
             this.playerService.getPlayerByname(event.target.value).subscribe(
              data => {
                this.changed=true;
                this.dataSource = new MatTableDataSource(data);
                this.players = data;
                console.log("size while retrieving match username : " + this.players);
              }
              );
            //console.log("Players id:" + data.id);
            //this.userid = data.id;
            //this.router.navigate(['players',this.userid]);
          }         
          },
          (error) => {this.statusMessage = 'No such userName exists!!!';
          console.log(error);}  
          );
      }
      else{
        
      }
      
    }

    deleteRecords(){
      //console.log("delete records");
      //this.url="id="+this.selectedIds[0]+"&id="+this.selectedIds[1];
      console.log("selected ids : " + this.selectedIds);
      
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: {top: "10px" },
      data: {
        title: "Are you sure to delete the records?",
        message: "You are about to delete player/s"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => 
     {console.log(dialogResult);
     if(dialogResult){
       console.log("Deletion in progress");
      this.playerService.deletePlayers(this.selectedIds).subscribe(
        data => {
          console.log("deleted");
          //this.dataSource = data.filter(x => x.id !== data.id);
          for (let index = 0; index < this.selectedIds.length; index++) {
            const i = this.players.find(x => x.id === this.selectedIds[index]);
            this.players.splice(this.players.indexOf(i,1));
            this.dataSource = new MatTableDataSource(this.players);
            console.log("i is ///// :" + i);
          }
          this._snackBar.open("Player/s deleted Successfully!!!",'Dismiss',{
            duration: 3000,
            verticalPosition: 'top'
        }
      );
      //this.router.navigate(['/delete']);
    },
    (error) => {console.log(error);}
    );
  }
  else{
    console.log("Failed to delete");
  }
 }
 );  }


    selectPlayer(id: any){
            console.log("id is: " + id + "size is: " + this.selectedIds.length);
         let i = this.selectedIds.indexOf(id);
         console.log("index is : " + i);
         if(i > -1){         
          console.log("splicing");
          this.selectedIds.splice(i,1);
         }
         else{
          console.log("Adding: " + i);
          this.selectedIds.push(id);
         }
            //  if(event.target.checked){
            //    console.log("adding to list")
            //    this.selectedIds.push(id);
            //  }else{
            //    console.log("removing from list");
            //    let i = this.selectedIds.indexOf(id);
            //    this.selectedIds.splice(i,1);
            //  }
            console.log("size :" + this.selectedIds.length);
    }


  ngOnInit(): void {
    this.playerService.getPlayerList().subscribe(playersList => {
      this.players=playersList;
      this.dataSource = new MatTableDataSource(playersList);
    });
  }
}

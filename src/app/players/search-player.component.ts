import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PlayerService } from '../player.service';
import { MatTableDataSource } from '@angular/material/table';
import { ListPlayersComponent } from '../players/list-players.component';
import { merge, Subject, Observable } from 'rxjs';
import { Player } from '../model/player';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.css']
})
export class SearchPlayerComponent implements OnInit {

  public dataSource: MatTableDataSource<Player>;
  players: Observable<Player[]>;
  @Output() searched = new EventEmitter<string>();
   @Input() result: string="";
   searchTermed: string;
   private id: number;
   private userName: string;

  constructor(private playerService: PlayerService,private activatedRoute: ActivatedRoute) { 

  }

  onClick(fieldName: string,searchTerm:string='',fieldName1: string,searchTerm1:string='',
    fieldName2: string,searchTerm2:string='',fieldName3: string, searchTerm3){  
      console.log("searchTerm2: " + searchTerm2);
      /*if(searchTerm===""){
        this.searchTermed=fieldName1+"="+searchTerm1+"&"+fieldName2+"="+searchTerm2;
      }if(searchTerm1===""){
        this.searchTermed=fieldName+"="+searchTerm+"&"+fieldName2+"="+searchTerm2;
      }if(searchTerm2===""){
        this.searchTermed=fieldName+"="+searchTerm+"&"+fieldName1+"="+searchTerm1;
      }*/
    this.searchTermed=fieldName+"="+searchTerm+"&"+fieldName1+"="+searchTerm1+"&"+fieldName2+"="+searchTerm2+"&"+fieldName3+"="+searchTerm3;
    this.searched.emit(this.searchTermed);  
    } 

  // onSearch(fieldName: string,searchTerm: string){
  //   console.log("input value: " + searchTerm + "fieldName: " + fieldName);
  //   return this.playerService.searchPlayer(fieldName,searchTerm).subscribe(
  //     (data) => {
  //       this.players=data;
  //       this.dataSource.data = data;
  //     }
  //   );
  // }

  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe(params => 
    //   {
    //     this.id = +params.get('id');
    //     this.userName = params.get('userName');
    //     console.log("Id: " + this.id + "userName: " + this.userName);
    //    });
    // this.searchTermed="userName="+this.userName;
    // this.playerService.searchPlayer(this.searchTermed);

}

}

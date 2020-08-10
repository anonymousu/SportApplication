import { Component, OnInit, ViewChild, Output, EventEmitter, Input  } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router } from '@angular/router';
import { merge, Subject, Observable } from 'rxjs';
import { Player } from '../model/player';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.css']
})

export class ListPlayersComponent implements OnInit {

   players: Observable<Player[]>;
   public dataSource: MatTableDataSource<Player>;
   @ViewChild(MatSort, {static: true}) sort: MatSort;
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['id','userName', 'firstName', 'lastName', 'email'];
  
  constructor(private playerService: PlayerService, public router: Router) {
    }

  onSearch(searchTerm: string){
    console.log("input value: " + searchTerm );
    return this.playerService.searchPlayer(searchTerm).subscribe(
      (data) => this.dataSource.data = data
    );
  }

   ngOnInit(): void {
    this.reloadData();
    }


  reloadData() : void{
   // this.players = this.playerService.getPlayerList();
   // this.dataSource = new MatTableDataSource(this.playerService.getPlayerList());
    this.playerService.getPlayerList().subscribe(playersList => {
     this.players=playersList;
     this.dataSource = new MatTableDataSource(playersList);
     this.dataSource.paginator=this.paginator;
     this.dataSource.sort = this.sort;
     //this.dataSource.filterPredicate = function(data, filter: string): boolean{
     //  return data.id.toString() === filter || data.firstName.trim().toLowerCase().includes(filter);
     //};

     },
     err => {console.log(err);
             return false;
           });
   }

   applyFilter(filterValue : String) {
     this.dataSource.filter = filterValue.trim().toLowerCase();
   } 

}

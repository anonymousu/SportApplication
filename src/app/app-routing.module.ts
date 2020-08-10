import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPlayersComponent } from './players/list-players.component';
import { DeletePlayerComponent } from './players/delete-player/delete-player.component';
import { SearchPlayerComponent } from './players/search-player.component';
import { RegisterPlayerComponent } from './players/register-player/register-player.component';
import { UpdatePlayerComponent } from './players/update-player.component';
import { PlayerDetailsComponent } from './players/player-details/player-Details.component';
import { HomeComponent } from './players/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'players', component: ListPlayersComponent},
  //{path: 'search' , component: SearchPlayerComponent},
  {path: 'search' , component: ListPlayersComponent},
  {path: 'delete' , component: DeletePlayerComponent},
  {path: 'delete/:id' , component: DeletePlayerComponent},
  {path: 'update/:id' , component: UpdatePlayerComponent},
  {path: 'players/:id' , component: PlayerDetailsComponent},
  {path: 'players' , component: PlayerDetailsComponent},
  {path: 'register' , component: RegisterPlayerComponent},
  {path: '', redirectTo: '/home',pathMatch: 'full'}
  //{path: '**' , component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const componentsUsed = [ListPlayersComponent,PlayerDetailsComponent,DeletePlayerComponent,SearchPlayerComponent,RegisterPlayerComponent,HomeComponent];

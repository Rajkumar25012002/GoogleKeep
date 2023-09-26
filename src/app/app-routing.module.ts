import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './notes/components/main/main.component';
import { NoteDetailsComponent } from './notes/components/main/note-display/note-details/note-details/note-details.component';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'note/:noteId', component: NoteDetailsComponent }
    ],
  },
  {
    path:'labels/:labelId',
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

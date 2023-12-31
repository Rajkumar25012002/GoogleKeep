import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './notes/components/main/main.component';
import { NoteDetailsComponent } from './notes/components/main/note-display/note-details/note-details/note-details.component';
import { NoteDisplayComponent } from './notes/components/main/note-display/note-display.component';
import { NotesBinComponent } from './notes/components/main/notes-bin/notes-bin.component';
import { NotesArchievedComponent } from './notes/components/main/notes-archieved/notes-archieved.component';
import { NotesAddLabelComponent } from './notes/components/main/notes-add-label/notes-add-label.component';
import { NoteRemainderComponent } from './notes/components/main/note-display/note-remainder/note-remainder.component';
import { NotesSearchComponent } from './notes/components/main/notes-search/notes-search.component';
import { NoteSearchResultComponent } from './notes/components/main/notes-search/note-search-result/note-search-result.component';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: NoteDisplayComponent,
        children: [{ path: 'edit/labels', component: NotesAddLabelComponent }],
      },
      { path: 'labels/:labelId', component: NoteDisplayComponent },
      { path: 'note/:noteId', component: NoteDetailsComponent },
      { path: 'remainders', component: NoteRemainderComponent },
      {
        path: 'searchNote',
        component: NotesSearchComponent,
        children: [],
      },
      {
        path: 'searchNote/:searchType/:searchText',
        component: NoteSearchResultComponent,
      },
      { path: 'archieve', component: NotesArchievedComponent },
      { path: 'bin', component: NotesBinComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

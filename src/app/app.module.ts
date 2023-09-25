import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './notes/components/header/header.component';
import { MainComponent } from './notes/components/main/main.component';
import { ContentComponent } from './notes/components/main/content/content.component';
import { NoteDisplayComponent } from './notes/components/main/note-display/note-display.component';
import { SingleNoteComponent } from './notes/components/main/note-display/single-note/single-note/single-note.component';
import { NoteDetailsComponent } from './notes/components/main/note-display/note-details/note-details/note-details.component';
import { ColorPickerComponent } from './notes/components/main/note-display/color-picker/color-picker.component';
import { LabelExtractorDirective } from './notes/directives/label-extractor.directive';
import { NoteOptionsComponent } from './notes/components/main/note-display/note-options/note-options.component';
import { LabelEditorComponent } from './notes/components/main/note-display/label-editor/label-editor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    ContentComponent,
    NoteDisplayComponent,
    SingleNoteComponent,
    NoteDetailsComponent,
    ColorPickerComponent,
    LabelExtractorDirective,
    NoteOptionsComponent,
    LabelEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

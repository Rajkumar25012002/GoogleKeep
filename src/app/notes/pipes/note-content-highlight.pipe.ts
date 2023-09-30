import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({
  name: 'noteContentHighlight',
})
export class NoteContentHighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, searchText: string): SafeHtml {
    if (!searchText || !value) {
      return value;
    }
    const searchRegex = new RegExp(searchText, 'gi');
    const highlightedValue = value.replace(
      searchRegex,
      (match) =>
        `<span class="highlight" style="background-color: rgb(251,188,4); color: rgb(255,255,255);"1>${match}</span>`
    );
    return this.sanitizer.bypassSecurityTrustHtml(highlightedValue);
  }
}

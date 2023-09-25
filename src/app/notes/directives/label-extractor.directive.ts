import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appLabelExtractor]'
})
export class LabelExtractorDirective {

  constructor() { }
  @Output() labelsChanged = new EventEmitter<string[]>();
  private labels: string[] = [];

  @HostListener('input', ['$event.target.value']) onInput(value: string): void {
    const hashtags = value.match(/#\w+/g);

    if (hashtags) {
      const uniqueHashtags = Array.from(new Set(hashtags.map(tag => tag.toLowerCase().replace('#', ''))));
      this.labels = uniqueHashtags;
    } else {
      this.labels = [];
    }

    this.labelsChanged.emit(this.labels);
  }

}

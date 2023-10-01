import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from 'src/app/notes/services/shared.service';
import { ColorEntry } from 'src/app/notes/types/note';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  @Input('show') show!: boolean;
  @Input('selectedColor') selectedColor!: ColorEntry;
  @Input('selectedImage') selectedImage!: string;
  @Output() selectedColorChange = new EventEmitter<ColorEntry>();
  @Output() selectedImageChange = new EventEmitter<string>();
  isDarkMode: boolean = false;
  showColorName: { show: boolean }[] = [];
  constructor(private sharedService: SharedService) {}
  ngOnInit(): void {
    this.sharedService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
    this.colorPallete.map((color) => {
      this.showColorName.push({
        show: false,
      });
    });
  }

  colorPallete: ColorEntry[] = [
    {
      name: 'Default',
      lightColor: 'transparent',
      darkColor: 'transparent',
    },
    {
      name: 'Coral',
      lightColor: 'rgb(250,175,168)',
      darkColor: 'rgb(119,23,46)',
    },
    {
      name: 'Peach',
      lightColor: 'rgb(243,159,118)',
      darkColor: 'rgb(105,43,23)',
    },
    {
      name: 'Sand',
      lightColor: 'rgb(255,248,184)',
      darkColor: 'rgb(124,74,3)',
    },
    {
      name: 'Mint',
      lightColor: 'rgb(226,246,211)',
      darkColor: 'rgb(38,77,59)',
    },
    {
      name: 'Sage',
      lightColor: 'rgb(180,221,211)',
      darkColor: 'rgb(12,98,93)',
    },
    {
      name: 'Fog',
      lightColor: 'rgb(212,228,237)',
      darkColor: 'rgb(37,99,119)',
    },
    {
      name: 'Storm',
      lightColor: 'rgb(174,204,220)',
      darkColor: 'rgb(40,66,85)',
    },
    {
      name: 'Dusk',
      lightColor: 'rgb(211,192,219)',
      darkColor: 'rgb(71,46,91)',
    },
    {
      name: 'Blossom',
      lightColor: 'rgb(246,226,221)',
      darkColor: 'rgb(108,57,79)',
    },
    {
      name: 'Clay',
      lightColor: 'rgb(233,227,212)',
      darkColor: 'rgb(75,68,58)',
    },
    {
      name: 'Chalk',
      lightColor: 'rgb(239,239,241)',
      darkColor: 'rgb(35,36,39)',
    },
  ];
  imagePallete: string[] = [
    '',
    'https://images.unsplash.com/photo-1594488518065-832318c2405b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1476136236990-838240be4859?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    'https://images.unsplash.com/photo-1628925618251-49bf54092e20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    'https://images.unsplash.com/photo-1504731231146-c0f65dc6a950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    'https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1535540878298-a155c6d065ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1477313372947-d68a7d410e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  ];
  changeColor(color: ColorEntry) {
    this.selectedColor = color;
    this.selectedColorChange.emit(this.selectedColor);
  }
  changeImage(image: string) {
    this.selectedImage = image;
    this.selectedImageChange.emit(this.selectedImage);
  }
  showName(id: number) {
    {
      this.showColorName.map((item, index) => {
        item.show = index === id;
      });
    }
  }
  hideName() {
    this.showColorName.forEach((item) => {
      item.show = false;
    });
  }
}

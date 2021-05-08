import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumeric]'
})
export class AppNumericDirective {

  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);

  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private element: ElementRef) {
  }


  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (this.specialKeys.indexOf(e.key) !== -1) {
      return;
    }
    const current: string = this.element.nativeElement.value;
    const position = this.element.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), e.key === 'Decimal' ? '.' : e.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      e.preventDefault();
    }
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

}

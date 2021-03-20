import { Directive, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appFormControl]'
})
export class FormControlDirective {

  @Input() control: FormControl;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.innerHTML = this.set_text();
    this.control.statusChanges.subscribe(
      (status) => {
        if (status == "INVALID"){
          this.el.nativeElement.innerHTML = this.set_text();
        }
      }
    );
  }
  
  private set_text(): string {
    if (this.control.errors == null){
      return "";
    }

    if (this.control.errors.hasOwnProperty('required'))
    {
      return "Required";
    } 
    else if (this.control.errors.hasOwnProperty('minlength')) 
    {
      return `Too short (${this.control.errors.minlength.requiredLength} minimum)`;
    } 
    else if (this.control.errors.hasOwnProperty('maxlength')) 
    {
      return `Too long (${this.control.errors.maxlength.requiredLength} maximum)`;
    } 
    else if (this.control.errors.hasOwnProperty('email'))
    {
      return 'Invalid email';
    } 
    else if (this.control.errors.hasOwnProperty('min')) 
    {
      return `${this.control.errors.min.min} minimum`;
    } 
    else if (this.control.errors.hasOwnProperty('max')) 
    {
      return `${this.control.errors.max.max} maximum`;
    } 
    else if (this.control.errors.hasOwnProperty('incorrect'))
    {
      return this.control.errors.incorrect.message[0];
    } 
    else if (this.control.errors.hasOwnProperty('mismatch'))
    {
      return "Password are not matching";
    }
    else 
    {
      return JSON.stringify(this.control.errors);
    }
  }

}

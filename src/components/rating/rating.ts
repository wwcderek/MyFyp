import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the RatingComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'rating',
  templateUrl: 'rating.html'
})
export class RatingComponent {


@Input() numStars: number = 5;
@Input() value: number = 0;
@Input() leitura: boolean = false;

@Output() ionClick:EventEmitter<number> = new EventEmitter<number>(); 
stars: string[] = [];
  constructor() {
    
  }
  ngAfterViewInit() 
  {
   this.calc();
  }

  calc() 
  {
    this.stars = [];
    let tmp = this.value;
    for(let i=0; i<this.numStars; i++, tmp--){
       if(tmp >= 1)
       this.stars.push("star");
       else if(tmp > 0 && tmp < 1)
       this.stars.push("star-half")
       else this.stars.push("star-outline");
    }
  }

  starClicked(index) 
  {
    if(!this.leitura) {
    console.log(index);
    this.value = index + 1;
    this.ionClick.emit(this.value);
    this.calc();
    }
  }

}

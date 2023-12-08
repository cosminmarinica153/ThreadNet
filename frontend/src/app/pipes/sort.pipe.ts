import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], sortBy: string, property: any, order: string = 'desc'): any[] {
    const resultArray: Array<any> = [];

    if(value.length === 0 || sortBy === '') return value;    

    for(const item of value)
      resultArray.push(item);

    resultArray.sort((a, b) => {
      const dateA = new Date(a.property);
      const dateB = new Date(b.property);
      
      return dateB.getTime() - dateA.getTime();
    });

    resultArray.reverse();

    if(sortBy === 'engagement'){
      resultArray.sort((a, b) => {
        const scoreA = a.up_votes - a.down_votes;
        const scoreB = b.up_votes - b.down_votes;
  
        return scoreB - scoreA;
      });
    }
    
    if(order === 'asc') resultArray.reverse();

    return resultArray;
  }

}

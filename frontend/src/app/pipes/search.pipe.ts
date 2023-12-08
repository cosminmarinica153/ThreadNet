import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], keyword: string): any[] {
    const resultArray = [];
    if(value.length === 0 || keyword === '') return value;

    for (const item of value){
      if(item['title'].toLowerCase().includes(keyword.toLowerCase()))
        resultArray.push(item);
      if(item['content'].toLowerCase().includes(keyword.toLowerCase()))
        resultArray.push(item);
    }
    return resultArray;
  }

}

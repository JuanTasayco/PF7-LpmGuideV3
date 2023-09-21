import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img',
  standalone: true,
})
export class ImgPipe implements PipeTransform {
  transform(argumentUrl: unknown, args: string): unknown {
    const url = `assets/${argumentUrl}.${args}`;

    return url;
  }
}

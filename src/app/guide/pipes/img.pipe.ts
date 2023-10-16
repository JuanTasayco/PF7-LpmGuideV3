import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img',
  standalone: true,
})
export class ImgPipe implements PipeTransform {
  transform(argumentUrl: string): string {
    return argumentUrl
      ? argumentUrl
      : 'https://res.cloudinary.com/dndimul42/image/upload/v1681839890/lpm/b9janghwwhy6agr5nj9x.jpg';
  }
}

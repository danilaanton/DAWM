import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageConverterService {
  constructor() {}

  toBase64(image: File | string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result !== null) {
          resolve(reader.result.toString());
        } else {
          reject(new Error('Error reading file'));
        }
      };
      reader.onerror = (error) => reject(error);
      if (image instanceof File) {
        reader.readAsDataURL(image);
      } else {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          const reader2 = new FileReader();
          reader2.onloadend = () => {
            if (reader2.result !== null) {
              resolve(reader2.result.toString());
            } else {
              reject(new Error('Error reading URL'));
            }
          };
          reader2.onerror = (error) => reject(error);
          reader2.readAsDataURL(xhr.response);
        };
        xhr.open('GET', image);
        xhr.responseType = 'blob';
        xhr.send();
      }
    });
  }

  toFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = Buffer.from(arr[1], 'base64');
    const u8arr = new Uint8Array(bstr);
    return new File([u8arr], filename, { type: mime });
  }
}

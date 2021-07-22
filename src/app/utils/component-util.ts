import { Picture } from './../models/picture';
export function toBase64v2(fileInput:HTMLInputElement) {

     
    return new Promise<string>((resolve, reject) => {
        try {
            const reader = new FileReader();
            if (null ==  fileInput.files) {
                resolve("");
                return;
            }
            reader.readAsDataURL(fileInput.files[0]);
            console.debug("fileInput.files[0]: ", fileInput.files[0]);
            reader.onload = function () { resolve(new String(reader.result).toString()); }
            reader.onerror = function (error) {
                reject(error);
            }
        } catch (e) {
            reject(e);
        }
    });

}

export const toPicture = (fileInput:HTMLInputElement):Promise<Picture|null>  => {
     
    return new Promise<Picture|null>((resolve, reject) => {
        try {
            const reader = new FileReader();
            
            if (null ==  fileInput.files) {
                resolve(null);
                return;
            }
            const file = fileInput.files[0];
            reader.readAsDataURL(file);
            console.debug("fileInput.files[0]: ", fileInput.files[0]);
           
            reader.onload = function () { 
                const p:Picture = new Picture();
                p.name = file.name;
                p.base64Data = new String(reader.result).toString();
                resolve(p); 
            }
            reader.onerror = function (error) {
                reject(error);
            }
        } catch (e) {
            reject(e);
        }
    });

}
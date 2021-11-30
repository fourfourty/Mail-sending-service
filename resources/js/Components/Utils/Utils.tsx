interface IProp {
    prop: {
        name: string,
        email: string,
        password: string,
        confirmPassword: string,
        phone: string | number,
        role: string,
    }
}

    export const validateEmail = (data:string) => {
        const reg = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
        return (reg.test(data)) ? true : false;
    }
    
    export function compose<T>(...fns:Function[]){
        return <E,>(initialValue:any): T => fns.reduceRight((prevValue,fn) => fn(prevValue), initialValue)  
    }

    export const validateName = (data:string): boolean => {
        if (data.search(/[0-9A-Za-z-?%#*=<>_+()$&@/!]/) === -1) return true;
        else return false;
    }

    export const replaceField = (str: string) =>  (str.replace(/\n+/g, ''));

    export const replacedForms = (str: string): string[] => (str.replace(/\n+/g, ',').split(','));

    export const checkSendResult = (str: string) =>  ((str === 'success') ? true : false);

  
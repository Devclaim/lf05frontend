
export async function GetKundenAll() {
    try {
        const response = await fetch('kunden/all');
        return await response.json();
     } catch (error) {
        return false;
     }  
}

export async function GetKunde(kundenID) {
    try {
        const response = await fetch(`kunden/?kundennr=${kundenID}`);
        return await response.json();
    } catch (error) {
        return false;
    }
}

export async function GetRezepteAll(kundenID) {
    try {
        const response = await fetch('rezepte/all');
        return await response.json();
     } catch (error) {
        return false;
     }
}
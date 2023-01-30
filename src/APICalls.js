
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

export async function GetKundePlz(plz) {
    try {
        const response = await fetch(`kunden/region/?plz=${plz}`);
        return await response.json();
    } catch (error) {
        return false;
    }
}

export async function DeleteKunde(kundenID) {
    try {
        const response = await fetch(`kunden/delete/?kundennr=${kundenID}`);
        return await response.json();
    } catch (error) {
        return false;
    }
}

export async function GetRezepteAll() {
    try {
        const response = await fetch('rezepte/all');
        return await response.json();
     } catch (error) {
        return false;
     }
}

export async function GetRezept(rezeptID) {
    try {
        const response = await fetch(`rezepte/rezept/?rezeptnr=${rezeptID}`);
        return await response.json();
     } catch (error) {
        return false;
     }
}

export async function GetRezepteByZutat(zutatNR) {
    try {
        const response = await fetch(`rezepte/zutat/?zutatnr=${zutatNR}`);
        return await response.json();
     } catch (error) {
        return false;
     }
}

export async function GetRezepteByMaxKal(max) {
    try {
        const response = await fetch(`rezepte/kalorien/?max=${max}`);
        return await response.json();
     } catch (error) {
        return false;
     }
}

export async function GetRezepteByEigenschaft(eigenschaft) {
    try {
        const response = await fetch(`rezepte/kategorien/?eigenschaft=${eigenschaft}`);
        return await response.json();
     } catch (error) {
        return false;
     }
}

export async function GetRezepteByEigenschaftAndMaxZutat(eigenschaft, maxCal) {
    try {
        const response = await fetch(`rezepte/kategorien/max/?eigenschaft=${eigenschaft}&max=${maxCal}`);
        return await response.json();
     } catch (error) {
        return false;
     }
}

export async function GetRezepteByMaxZutat(max) {
    try {
        const response = await fetch(`rezepte/zutatenanzahl/?max=${max}`);
        return await response.json();
     } catch (error) {
        return false;
     }
}

export async function GetZutatenAll() {
    try {
        const response = await fetch('zutaten/all');
        return await response.json();
     } catch (error) {
        return false;
     }
}
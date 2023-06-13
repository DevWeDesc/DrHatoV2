
export function chartsCount (data: any) {
let total: any = {} 

data.forEach((element : any) => {
    //@ts-ignore
    const key = element.howKnowUs;
    total[key] = (total[key] || 0) + 1;
});
return total;

}


import { RATES } from './Rates';

export interface RoomDimension {
  id: number; name: string; length: number; width: number; height: number;
  includesWallDesigning: boolean; designingWalls: number;
}
export interface CalculatorState {
  serviceType: string; propertyType: string; rooms: RoomDimension[];
  paintRequired: boolean; paintQuality: string; coats: number;
  includesCeiling: boolean; includesDoors: number; includesWindows: number;
  includesWoodwork: boolean; includesPutty: boolean; includesPrimer: boolean;
  includesRoof: boolean; location: string;
  coverage: number; wastagePercent: number; packSize: number; packPrice: number;
  materialMode: 'area' | 'packs'; scaffoldingCharge: number; minimumJobCharge: number;
}
export function initialCalculatorState(): CalculatorState {
  return {
    serviceType:'Interior Painting',propertyType:'House / Bungalow',
    rooms:[{id:1,name:'Living Room',length:12,width:10,height:10,includesWallDesigning:false,designingWalls:1}],
    paintRequired:true,paintQuality:'good',coats:2,includesCeiling:true,includesDoors:0,includesWindows:0,
    includesWoodwork:false,includesPutty:true,includesPrimer:true,includesRoof:false,location:'gulshan_e_iqbal',
    coverage:100,wastagePercent:10,packSize:4,packPrice:0,materialMode:'area',scaffoldingCharge:0,minimumJobCharge:0,
  };
}
const number = (value: number, label: string, positive = false) => {
  const n = Number(value);
  if (!Number.isFinite(n) || (positive ? n <= 0 : n < 0)) throw new Error(`${label} must be ${positive ? 'greater than zero' : 'zero or more'}.`);
  return n;
};
export function calculatePaintingCost(state: CalculatorState) {
  if (!state.rooms.length) throw new Error('Add at least one room.');
  if (!['standard','good','premium'].includes(state.paintQuality)) throw new Error('Choose a paint quality.');
  if (![1,2].includes(state.coats)) throw new Error('Choose one or two coats.');
  if (!['area','packs'].includes(state.materialMode)) throw new Error('Choose a material pricing method.');
  let grossArea=0, designingArea=0;
  for (const [index,room] of state.rooms.entries()) {
    const l=number(room.length,`Room ${index+1} length`,true);
    const w=number(room.width,`Room ${index+1} width`,true);
    const h=number(room.height,`Room ${index+1} height`,true);
    grossArea+=2*(l+w)*h+(state.includesCeiling?l*w:0);
    if (room.includesWallDesigning) {
      const walls=number(room.designingWalls,'Designing walls',true);
      if (!Number.isInteger(walls)||walls>4) throw new Error('Designing walls must be a whole number from 1 to 4.');
      designingArea+=(l+w)/2*h*walls;
    }
  }
  const doors=number(state.includesDoors,'Door count'), windows=number(state.includesWindows,'Window count');
  if (!Number.isInteger(doors)||!Number.isInteger(windows)) throw new Error('Door and window counts must be whole numbers.');
  const openings=state.includesWoodwork?doors*21+windows*12:0;
  if (openings>=grossArea) throw new Error('Door/window openings must be smaller than the paintable area.');
  const totalArea=grossArea-openings;
  const location=RATES.locationMultiplier[state.location as keyof typeof RATES.locationMultiplier];
  if (!location) throw new Error('Choose a location from the list.');
  const quality=state.paintQuality as keyof typeof RATES.labor;
  const coats=RATES.coatMultiplier[state.coats as 1|2];
  const laborCost=totalArea*RATES.labor[quality]*location*coats;
  let materialCost=0,wastageCost=0,baseLitres=0,wastageLitres=0,requiredLitres=0,packCount=0,purchaseLitres=0;
  if(state.paintRequired) {
    const coverage=number(state.coverage,'Coverage',true), packSize=number(state.packSize,'Pack size',true);
    const wastage=number(state.wastagePercent,'Wastage');
    if(wastage>100) throw new Error('Wastage must be between 0% and 100%.');
    baseLitres=totalArea*state.coats/coverage;wastageLitres=baseLitres*wastage/100;requiredLitres=baseLitres+wastageLitres;
    const roundPacks=(litres:number)=>Math.ceil(Number((litres/packSize).toFixed(10)));
    packCount=roundPacks(requiredLitres);purchaseLitres=packCount*packSize;
    if(state.materialMode==='packs') {
      const price=number(state.packPrice,'Pack price',true),basePacks=roundPacks(baseLitres);
      materialCost=basePacks*price;wastageCost=(packCount-basePacks)*price;
    } else {
      materialCost=totalArea*RATES.material[quality]*location*coats;wastageCost=materialCost*wastage/100;
    }
  }
  const puttyCharge=state.includesPutty?totalArea*RATES.putty*location:0;
  const primerCharge=state.includesPrimer?totalArea*RATES.primer*location:0;
  const doorsCharge=state.includesWoodwork?doors*RATES.door*location:0;
  const windowsCharge=state.includesWoodwork?windows*RATES.window*location:0;
  const woodworkCharge=doorsCharge+windowsCharge;
  const wallDesigningCharge=designingArea*RATES.wallDesigning*location;
  const subtotal=laborCost+materialCost+wastageCost+puttyCharge+primerCharge+woodworkCharge+wallDesigningCharge;
  const roofCharge=state.includesRoof?subtotal*.05:0;
  const scaffoldingCharge=number(state.scaffoldingCharge,'Scaffolding charge');
  const minimum=number(state.minimumJobCharge,'Minimum job amount');
  const beforeMinimum=subtotal+roofCharge+scaffoldingCharge;
  const minimumTopUp=Math.max(0,minimum-beforeMinimum),totalCost=beforeMinimum+minimumTopUp;
  return {laborCost,materialCost,wastageCost,puttyCharge,primerCharge,doorsCharge,windowsCharge,woodworkCharge,wallDesigningCharge,roofCharge,scaffoldingCharge,minimumTopUp,totalArea,totalCost,
    minCost:Math.max(minimum,beforeMinimum*.9),maxCost:Math.max(minimum,beforeMinimum*1.1),
    baseLitres,wastageLitres,requiredLitres,packCount,purchaseLitres};
}

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
function load(file,requireFn=()=>{throw new Error('Unexpected dependency');}) {
  const js=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText;
  const exports={};new Function('exports','require',js)(exports,requireFn);return exports;
}
const {RATES}=load('utils/Rates.ts');
const {calculatePaintingCost:calc,initialCalculatorState:initial}=load('utils/CalculatePaintingCost.ts',name=>{assert.equal(name,'./Rates');return {RATES};});
const close=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-6,`${actual} != ${expected}`);
const run=changes=>calc({...initial(),...changes});
test('all monetary rates increase 10%, factors retain their original values',()=>{
  assert.deepEqual(RATES.labor,{standard:38.5,good:44,premium:55});
  assert.deepEqual(RATES.material,{standard:8.8,good:15.4,premium:24.2});
  assert.deepEqual([RATES.putty,RATES.primer,RATES.door,RATES.window,RATES.wallDesigning],[6.6,4.4,880,550,49.5]);
  assert.equal(RATES.coatMultiplier[2],1.6);assert.equal(RATES.locationMultiplier.gulshan_e_iqbal,1.6);
});
test('approved default, wastage and roof amounts with 10% uplift',()=>{
  close(run({wastagePercent:0}).totalCost,95011.84);
  close(run({}).totalCost,97219.584);
  close(run({includesRoof:true}).totalCost,102080.5632);
  close(run({includesRoof:true}).roofCharge,run({}).totalCost*.05);
});
test('woodwork off disables opening deductions even with retained counts',()=>{
  assert.equal(run({includesDoors:1,includesWindows:1}).totalArea,560);
  assert.equal(run({includesDoors:1,includesWindows:1}).woodworkCharge,0);
  const on=run({includesDoors:1,includesWindows:1,includesWoodwork:true});
  assert.equal(on.totalArea,527);close(on.doorsCharge,880*1.6);close(on.windowsCharge,550*1.6);
});
test('whole-pack pricing replaces material, separates waste packs without coat/location price multipliers',()=>{
  const r=run({materialMode:'packs',packPrice:4000});
  close(r.baseLitres,11.2);close(r.requiredLitres,12.32);assert.equal(r.packCount,4);
  assert.equal(r.materialCost,12000);assert.equal(r.wastageCost,4000);assert.equal(r.purchaseLitres,16);
  const noExtraPack=run({includesWoodwork:true,includesDoors:1,includesWindows:1,materialMode:'packs',packPrice:4000});
  assert.equal(noExtraPack.packCount,3);assert.equal(noExtraPack.wastageCost,0);
});
test('paint supplied by customer removes quantity/material/waste, keeps selected prep',()=>{
  const r=run({paintRequired:false,materialMode:'packs',packPrice:0,coverage:0});
  assert.equal(r.materialCost,0);assert.equal(r.wastageCost,0);assert.equal(r.requiredLitres,0);assert.ok(r.puttyCharge>0);
});
test('multi-room geometry adds rooms; scaffolding and minimum apply once to entire job',()=>{
  const rooms=[...initial().rooms,{...initial().rooms[0],id:2}];
  const r=run({rooms,scaffoldingCharge:2500});assert.equal(r.totalArea,1120);
  close(r.totalCost,run({}).totalCost*2+2500);
  const min=run({minimumJobCharge:150000});assert.equal(min.totalCost,150000);assert.equal(min.minCost,150000);assert.equal(min.maxCost,150000);
  assert.equal(run({minimumJobCharge:1000}).minimumTopUp,0);
});
test('invalid dimensions, counts, coverage and pricing fail instead of returning invalid estimates',()=>{
  for(const input of [{rooms:[{...initial().rooms[0],length:0}]},{includesDoors:-1},{includesWindows:1.5},{coverage:0},{wastagePercent:101},{materialMode:'packs',packPrice:0},{scaffoldingCharge:NaN},{minimumJobCharge:-1},{includesWoodwork:true,includesDoors:100}])assert.throws(()=>run(input));
});
test('traffic metadata remains unchanged and generated calculator guide matches visible data',()=>{
  const source=fs.readFileSync('pages/CostCalculator.tsx','utf8');
  assert.ok(source.includes('title="Latest 2026 Painting Cost Calculator | Painter Charges Karachi – Sikander Arts"'));
  assert.ok(source.includes('description="Get instant online estimates for wall painting and painter charges in Karachi. Use our free calculator for latest 2026 paint labour rates. Fast, free, and accurate painting cost estimation."'));
  assert.ok(source.includes('url="https://sikanderart.com/calculate-cost"'));
  const html=fs.readFileSync('dist/calculate-cost.html','utf8');
  const guide=JSON.parse(fs.readFileSync('utils/CalculatorGuide.json','utf8'));
  for(const entry of guide)assert.ok(html.includes(entry.heading.replaceAll('&','&amp;')));
  assert.equal((html.match(/<h1/g)||[]).length,1);
});

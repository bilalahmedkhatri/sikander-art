import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ROOM_NAMES,
  SERVICE_TYPES,
  PROPERTY_TYPES,
  LOCATION_GROUPS
} from '@/utils/CalculatorProperties';
import { RATES } from '@/utils/Rates';
import {
  Calculator,
  Ruler,
  Home,
  Building2,
  PaintBucket,
  Layers,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Phone,
  Plus,
  Trash2,
  DollarSign,
  MapPin,
  MessageCircle
} from 'lucide-react';

// --- Types ---
interface RoomDimension {
  id: number;
  name: string;
  length: number;
  width: number;
  height: number;
  includesWallDesigning: boolean;
  designingWalls: number;
}

interface CalculatorState {
  serviceType: string;
  propertyType: string;
  rooms: RoomDimension[];
  paintRequired: boolean;
  paintQuality: string;
  coats: number;
  includesCeiling: boolean;
  includesDoors: number;
  includesWindows: number;
  includesWoodwork: boolean;
  includesPutty: boolean;
  includesPrimer: boolean;
  includesRoof: boolean;
  location: string;
}

interface CostBreakdown {
  laborCost: number;
  materialCost: number;
  puttyCharge: number;
  primerCharge: number;
  woodworkCharge: number;
  doorsCharge: number;
  windowsCharge: number;
  wallDesigningCharge: number;
  roofCharge: number;
  totalArea: number;
  totalCost: number;
  minCost: number;
  maxCost: number;
}

const CostCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<CalculatorState>({
    serviceType: 'Interior Painting',
    propertyType: 'House / Bungalow',
    rooms: [{ id: 1, name: 'Living Room', length: 12, width: 10, height: 10, includesWallDesigning: false, designingWalls: 1 }],
    paintRequired: true,
    paintQuality: 'good',
    coats: 2,
    includesCeiling: true,
    includesDoors: 0,
    includesWindows: 0,
    includesWoodwork: false,
    includesPutty: true,
    includesPrimer: true,
    includesRoof: false,
    location: 'gulshan_e_iqbal'
  });

  const [result, setResult] = useState<CostBreakdown | null>(null);

  const handleRoomChange = (id: number, field: keyof RoomDimension, value: any) => {
    setState(prev => ({
      ...prev,
      rooms: prev.rooms.map(room => room.id === id ? { ...room, [field]: value } : room)
    }));
  };

  const addRoom = () => {
    const newId = Math.max(...state.rooms.map(r => r.id)) + 1;
    setState(prev => ({
      ...prev,
      rooms: [...prev.rooms, { id: newId, name: 'Bedroom', length: 12, width: 10, height: 10, includesWallDesigning: false, designingWalls: 1 }]
    }));
  };

  const removeRoom = (id: number) => {
    if (state.rooms.length > 1) {
      setState(prev => ({
        ...prev,
        rooms: prev.rooms.filter(room => room.id !== id)
      }));
    }
  };

  const calculateCost = () => {
    let totalWallArea = 0;
    let totalWallDesigningArea = 0;

    state.rooms.forEach(room => {
      const perimeter = 2 * (Number(room.length) + Number(room.width));
      const wallArea = perimeter * Number(room.height);
      const ceilingArea = state.includesCeiling ? (Number(room.length) * Number(room.width)) : 0;
      totalWallArea += wallArea + ceilingArea;

      // Wall designing: each designing wall = length * height (assuming all walls same length avg)
      if (room.includesWallDesigning && room.designingWalls > 0) {
        const avgWallLength = (Number(room.length) + Number(room.width)) / 2;
        const designingArea = avgWallLength * Number(room.height) * Number(room.designingWalls);
        totalWallDesigningArea += designingArea;
      }
    });

    const doorsArea = state.includesDoors * 21;
    const windowsArea = state.includesWindows * 12;
    const netPaintableArea = Math.max(0, totalWallArea - doorsArea - windowsArea);

    const quality = state.paintQuality as 'standard' | 'good' | 'premium';
    const loc = state.location as keyof typeof RATES.locationMultiplier;

    const locMultiplier = RATES.locationMultiplier[loc] || 1.0;
    const coatMult = RATES.coatMultiplier[state.coats as 1 | 2] || 1.0;

    const laborRate = RATES.labor[quality] * locMultiplier;
    const materialRate = state.paintRequired ? (RATES.material[quality] * locMultiplier) : 0;

    const laborCost = netPaintableArea * laborRate * coatMult;
    const materialCost = netPaintableArea * materialRate * coatMult;

    const puttyCharge = state.includesPutty ? (netPaintableArea * RATES.putty * locMultiplier) : 0;
    const primerCharge = state.includesPrimer ? (netPaintableArea * RATES.primer * locMultiplier) : 0;

    const doorsCharge = state.includesWoodwork ? (state.includesDoors * RATES.door * locMultiplier) : 0;
    const windowsCharge = state.includesWoodwork ? (state.includesWindows * RATES.window * locMultiplier) : 0;
    const woodworkCharge = doorsCharge + windowsCharge;

    const wallDesigningCharge = totalWallDesigningArea * RATES.wallDesigning * locMultiplier;

    const subtotal = laborCost + materialCost + puttyCharge + primerCharge + woodworkCharge + wallDesigningCharge;
    const roofCharge = state.includesRoof ? (subtotal * 0.05) : 0;
    const totalCost = subtotal + roofCharge;

    setResult({
      laborCost,
      materialCost,
      puttyCharge,
      primerCharge,
      woodworkCharge,
      doorsCharge,
      windowsCharge,
      wallDesigningCharge,
      roofCharge,
      totalArea: netPaintableArea,
      totalCost,
      minCost: totalCost * 0.9,
      maxCost: totalCost * 1.1
    });
  };

  useEffect(() => {
    if (result) {
      calculateCost();
    }
  }, [state]);

  const resetCalculator = () => {
    setResult(null);
    setStep(1);
    setState({
      serviceType: 'Interior Painting',
      propertyType: 'House / Bungalow',
      rooms: [{ id: 1, name: 'Living Room', length: 12, width: 10, height: 10, includesWallDesigning: false, designingWalls: 1 }],
      paintRequired: true,
      paintQuality: 'good',
      coats: 2,
      includesCeiling: true,
      includesDoors: 0,
      includesWindows: 0,
      includesWoodwork: false,
      includesPutty: true,
      includesPrimer: true,
      includesRoof: false,
      location: 'gulshan_e_iqbal'
    });
  };

  // Build WhatsApp message with estimate details
  const getWhatsAppLink = () => {
    if (!result) return 'https://wa.me/923022911088';
    const msg = `As Salam Alaikum Sikander Arts! 👋\n\nMain ne aap ka Cost Calculator use kiya aur mujhe ye estimate mila hai:\n\n` +
      `📋 Service: ${state.serviceType}\n` +
      `🏠 Property: ${state.propertyType}\n` +
      `📐 Total Area: ${Math.round(result.totalArea).toLocaleString()} sq ft\n` +
      `💰 Estimated Cost: Rs. ${Math.round(result.totalCost).toLocaleString()}\n\n` +
      `Barae meherbani mazeed tafseelat batayen aur is quote ko confirm karein. Shukriya!`;
    return `https://wa.me/923022911088?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      <Helmet>
        <title>Painting Cost Calculator | Sikander Arts – Karachi</title>
        <meta name="description" content="Use Sikander Arts' free painting cost calculator to estimate your painting project cost in Karachi." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Hero Section */}
        <section className="bg-primary pt-32 pb-20 text-white text-center px-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto max-w-4xl"
          >
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">Painting Cost Calculator</h1>
            <p className="text-lg text-gray-200 mb-6">Get an instant estimate for your painting project in Karachi — free, fast, and accurate</p>
            <div className="inline-block bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm font-medium border border-white/20">
              <span className="text-secondary mr-2">Note:</span> This is an estimated cost. Final price confirmed after free site visit.
            </div>
          </motion.div>
        </section>

        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT COLUMN - FORM */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
              >
                {/* Step Indicators */}
                <div className="flex justify-between mb-8 relative">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10"></div>
                  {[1, 2, 3, 4, 5, 6].map((s) => (
                    <div
                      key={s}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s ? 'bg-secondary text-white scale-110' : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                      {s}
                    </div>
                  ))}
                </div>

                <div className="space-y-8">
                  {/* Step 1: Service Type */}
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <PaintBucket size={20} className="text-secondary" /> Service Type
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {SERVICE_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => setState({ ...state, serviceType: type })}
                          className={`p-3 rounded-xl text-sm font-medium text-left transition-all border ${state.serviceType === type
                            ? 'bg-primary text-white border-primary shadow-lg'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Property Type */}
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <Building2 size={20} className="text-secondary" /> Property Type
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {PROPERTY_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => setState({ ...state, propertyType: type })}
                          className={`p-3 rounded-xl text-sm font-medium text-left transition-all border ${state.propertyType === type
                            ? 'bg-primary text-white border-primary shadow-lg'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Room Dimensions */}
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <Ruler size={20} className="text-secondary" /> Room Dimensions
                    </h3>
                    <div className="space-y-4">
                      {state.rooms.map((room, idx) => (
                        <motion.div
                          key={room.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-sm text-gray-500 uppercase">Room {idx + 1}</span>
                            {state.rooms.length > 1 && (
                              <button onClick={() => removeRoom(room.id)} className="text-red-400 hover:text-red-600">
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-1">
                              <label className="block text-xs font-bold text-gray-400 mb-1">Room Name</label>
                              <select
                                value={room.name}
                                onChange={(e) => handleRoomChange(room.id, 'name', e.target.value)}
                                className="w-full p-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                              >
                                {ROOM_NAMES.map(name => <option key={name} value={name}>{name}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-1">Length (ft)</label>
                              <input
                                type="number"
                                value={room.length}
                                onChange={(e) => handleRoomChange(room.id, 'length', e.target.value)}
                                className="w-full p-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-secondary outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-1">Width (ft)</label>
                              <input
                                type="number"
                                value={room.width}
                                onChange={(e) => handleRoomChange(room.id, 'width', e.target.value)}
                                className="w-full p-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-secondary outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-400 mb-1">Height (ft)</label>
                              <input
                                type="number"
                                value={room.height}
                                onChange={(e) => handleRoomChange(room.id, 'height', e.target.value)}
                                className="w-full p-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-secondary outline-none"
                              />
                            </div>
                          </div>

                          {/* Roof Section */}
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <label className="flex items-center justify-between cursor-pointer">
                              <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Home size={15} className="text-secondary" />
                                Include Roof Paint? <span className="ml-1 text-xs text-orange-500 font-bold">(+5% on total)</span>
                              </span>
                              <input
                                type="checkbox"
                                checked={state.includesRoof}
                                onChange={(e) => setState({ ...state, includesRoof: e.target.checked })}
                                className="w-5 h-5 text-secondary rounded focus:ring-secondary"
                              />
                            </label>
                          </div>

                          {/* Wall Designing Section */}
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <label className="flex items-center justify-between cursor-pointer">
                              <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <PaintBucket size={15} className="text-secondary" />
                                Add Wall Designing / Texture for this room?
                              </span>
                              <input
                                type="checkbox"
                                checked={room.includesWallDesigning}
                                onChange={(e) => handleRoomChange(room.id, 'includesWallDesigning', e.target.checked)}
                                className="w-5 h-5 text-secondary rounded focus:ring-secondary"
                              />
                            </label>
                            {room.includesWallDesigning && (
                              <div className="mt-3 flex items-center gap-3 bg-orange-50 p-3 rounded-lg border border-orange-100">
                                <label className="text-sm font-medium text-gray-700 flex-1">
                                  Number of walls to design:
                                </label>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleRoomChange(room.id, 'designingWalls', Math.max(1, room.designingWalls - 1))}
                                    className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 font-bold hover:bg-gray-100"
                                  >-</button>
                                  <span className="w-6 text-center font-bold text-secondary">{room.designingWalls}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRoomChange(room.id, 'designingWalls', Math.min(4, room.designingWalls + 1))}
                                    className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 font-bold hover:bg-gray-100"
                                  >+</button>
                                </div>
                                <span className="text-xs text-gray-400">(max 4)</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                      <button
                        onClick={addRoom}
                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-secondary hover:text-secondary transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus size={18} /> Add Another Room
                      </button>
                    </div>
                  </div>

                  {/* Step 4: Paint Quality */}
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-secondary" /> Paint & Quality
                    </h3>

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <label className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all flex-1 ${state.paintRequired ? 'border-secondary bg-orange-50' : 'border-gray-200 bg-gray-50'}`}>
                        <input
                          type="radio"
                          name="paintRequired"
                          checked={state.paintRequired === true}
                          onChange={() => setState({ ...state, paintRequired: true })}
                          className="w-5 h-5 text-secondary focus:ring-secondary"
                        />
                        <span className={`font-bold ${state.paintRequired ? 'text-secondary' : 'text-gray-700'}`}>With Paint (Material + Labor)</span>
                      </label>
                      <label className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all flex-1 ${!state.paintRequired ? 'border-secondary bg-orange-50' : 'border-gray-200 bg-gray-50'}`}>
                        <input
                          type="radio"
                          name="paintRequired"
                          checked={state.paintRequired === false}
                          onChange={() => setState({ ...state, paintRequired: false })}
                          className="w-5 h-5 text-secondary focus:ring-secondary"
                        />
                        <span className={`font-bold ${!state.paintRequired ? 'text-secondary' : 'text-gray-700'}`}>Without Paint (Labor Only)</span>
                      </label>
                    </div>

                    {state.paintRequired && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { id: 'standard', label: 'Standard', sub: 'Economy / Local Brands (Approx Rs. 4,500/Drum)' },
                          { id: 'good', label: 'Good', sub: 'Berger Elegance / Diamond (Approx Rs. 5,500/Gallon)' },
                          { id: 'premium', label: 'Premium', sub: 'Dulux / Nippon (Approx Rs. 8,000+/Gallon)' }
                        ].map((q) => (
                          <button
                            key={q.id}
                            onClick={() => setState({ ...state, paintQuality: q.id })}
                            className={`p-4 rounded-xl text-left transition-all border-2 ${state.paintQuality === q.id
                              ? 'border-secondary bg-orange-50'
                              : 'border-gray-100 bg-white hover:border-gray-200'
                              }`}
                          >
                            <div className={`font-bold ${state.paintQuality === q.id ? 'text-secondary' : 'text-gray-700'}`}>
                              {q.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{q.sub}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Step 5: Options */}
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <Layers size={20} className="text-secondary" /> Additional Options
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Number of Coats</span>
                        <div className="flex bg-white rounded-lg p-1 border border-gray-200">
                          <button
                            onClick={() => setState({ ...state, coats: 1 })}
                            className={`px-3 py-1 text-xs font-bold rounded ${state.coats === 1 ? 'bg-secondary text-white' : 'text-gray-500'}`}
                          >1</button>
                          <button
                            onClick={() => setState({ ...state, coats: 2 })}
                            className={`px-3 py-1 text-xs font-bold rounded ${state.coats === 2 ? 'bg-secondary text-white' : 'text-gray-500'}`}
                          >2</button>
                        </div>
                      </div>

                      <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                        <span className="text-sm font-medium text-gray-700">Include Ceiling?</span>
                        <input
                          type="checkbox"
                          checked={state.includesCeiling}
                          onChange={(e) => setState({ ...state, includesCeiling: e.target.checked })}
                          className="w-5 h-5 text-secondary rounded focus:ring-secondary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                        <span className="text-sm font-medium text-gray-700">Include Putty Work?</span>
                        <input
                          type="checkbox"
                          checked={state.includesPutty}
                          onChange={(e) => setState({ ...state, includesPutty: e.target.checked })}
                          className="w-5 h-5 text-secondary rounded focus:ring-secondary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                        <span className="text-sm font-medium text-gray-700">Include Primer Coat?</span>
                        <input
                          type="checkbox"
                          checked={state.includesPrimer}
                          onChange={(e) => setState({ ...state, includesPrimer: e.target.checked })}
                          className="w-5 h-5 text-secondary rounded focus:ring-secondary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer md:col-span-2">
                        <span className="text-sm font-medium text-gray-700">Include Woodwork/Doors Polish?</span>
                        <input
                          type="checkbox"
                          checked={state.includesWoodwork}
                          onChange={(e) => setState({ ...state, includesWoodwork: e.target.checked })}
                          className="w-5 h-5 text-secondary rounded focus:ring-secondary"
                        />
                      </label>


                      {state.includesWoodwork && (
                        <>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">Number of Doors</span>
                            <input
                              type="number"
                              value={state.includesDoors}
                              onChange={(e) => setState({ ...state, includesDoors: Number(e.target.value) })}
                              className="w-20 p-1 rounded border border-gray-300 text-sm text-center"
                            />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">Number of Windows</span>
                            <input
                              type="number"
                              value={state.includesWindows}
                              onChange={(e) => setState({ ...state, includesWindows: Number(e.target.value) })}
                              className="w-20 p-1 rounded border border-gray-300 text-sm text-center"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Step 6: Location */}
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <MapPin size={20} className="text-secondary" /> Location in Karachi
                    </h3>
                    <select
                      value={state.location}
                      onChange={(e) => setState({ ...state, location: e.target.value })}
                      className="w-full p-4 rounded-xl border border-gray-300 text-gray-700 font-medium focus:ring-2 focus:ring-secondary outline-none"
                    >
                      {LOCATION_GROUPS.map(group => (
                        <optgroup key={group.group} label={group.group}>
                          {group.areas.map(area => (
                            <option key={area.id} value={area.id}>{area.label}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      calculateCost();
                      setStep(6);
                    }}
                    className="w-full bg-secondary hover:bg-orange-600 text-white py-4 rounded-xl font-black text-xl uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
                  >
                    Calculate My Cost
                  </button>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN - RESULTS */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-24 space-y-6"
              >
                {result ? (
                  <>
                    <div className="bg-primary text-white rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Calculator size={150} />
                      </div>

                      <h2 className="text-2xl font-serif font-bold mb-6 relative z-10">Estimated Cost</h2>

                      <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-center text-sm text-blue-200">
                          <span>Total Paintable Area</span>
                          <span className="font-bold text-white">{Math.round(result.totalArea).toLocaleString()} sq ft</span>
                        </div>
                        <div className="h-px bg-white/10"></div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Labor Cost</span>
                            <span className="font-medium">Rs. {Math.round(result.laborCost).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Material Cost</span>
                            <span className="font-medium">Rs. {Math.round(result.materialCost).toLocaleString()}</span>
                          </div>
                          {/* Always list important bases below */}
                          <div className="flex justify-between">
                            <span className="text-gray-300">Putty Work</span>
                            <span className="font-medium">Rs. {Math.round(result.puttyCharge).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Primer Coat</span>
                            <span className="font-medium">Rs. {Math.round(result.primerCharge).toLocaleString()}</span>
                          </div>
                          {result.woodworkCharge > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Woodwork/Doors</span>
                              <span className="font-medium">Rs. {Math.round(result.woodworkCharge).toLocaleString()}</span>
                            </div>
                          )}
                          {result.wallDesigningCharge > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Wall Designing</span>
                              <span className="font-medium">Rs. {Math.round(result.wallDesigningCharge).toLocaleString()}</span>
                            </div>
                          )}
                          {result.roofCharge > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Roof / Chhat (5%)</span>
                              <span className="font-medium">Rs. {Math.round(result.roofCharge).toLocaleString()}</span>
                            </div>
                          )}
                        </div>

                        <div className="h-px bg-white/20 my-4"></div>

                        <div className="flex justify-between items-end">
                          <span className="text-lg font-bold text-secondary">Estimated Total</span>
                          <span className="text-3xl md:text-4xl font-black text-white">
                            Rs. {Math.round(result.totalCost).toLocaleString()}
                          </span>
                        </div>

                        <div className="bg-white/10 p-3 rounded-lg text-center text-xs text-blue-200 mt-4">
                          Price Range: Rs. {Math.round(result.minCost).toLocaleString()} – Rs. {Math.round(result.maxCost).toLocaleString()}
                        </div>

                        <div className="text-center text-xs text-orange-200 mt-3 font-medium px-2">
                          Note: Yeh qeemat abhi confirm nahi hay, visit ke baad hi confirmation prize di jaye gi, shukriya.
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                      <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                        <CheckCircle2 size={20} className="text-green-500" /> What's Included?
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5"></span>
                          Professional labor & supervision
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5"></span>
                          Premium quality paints & materials
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5"></span>
                          Surface preparation & sanding
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5"></span>
                          Post-painting cleanup
                        </li>
                      </ul>

                      <div className="space-y-3">
                        <Link
                          to="/contact"
                          className="w-full bg-secondary hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-center transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                          Get Exact Quote – Book Visit <ArrowRight size={18} />
                        </Link>

                        {/* WhatsApp Button */}
                        <a
                          href={getWhatsAppLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                          <MessageCircle size={18} /> WhatsApp for Further Info
                        </a>

                        <button
                          onClick={resetCalculator}
                          className="w-full text-gray-400 hover:text-gray-600 text-sm font-medium py-2 flex items-center justify-center gap-2"
                        >
                          <RotateCcw size={14} /> Calculate Again / Reset
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 h-full flex flex-col items-center justify-center min-h-[400px]">
                    <div className="bg-gray-50 p-6 rounded-full mb-6">
                      <DollarSign size={48} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-400 mb-2">Ready to Calculate?</h3>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto">
                      Fill in the details on the left and click "Calculate My Cost" to see your estimate here.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CostCalculator;
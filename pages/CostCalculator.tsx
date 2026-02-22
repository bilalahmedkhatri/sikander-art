import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
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
  MapPin
} from 'lucide-react';

// --- Types ---
interface RoomDimension {
  id: number;
  name: string;
  length: number;
  width: number;
  height: number;
}

interface CalculatorState {
  serviceType: string;
  propertyType: string;
  rooms: RoomDimension[];
  paintQuality: string;
  coats: number;
  includesCeiling: boolean;
  includesDoors: number;
  includesWindows: number;
  includesWoodwork: boolean;
  includesPutty: boolean;
  includesPrimer: boolean;
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
  totalArea: number;
  totalCost: number;
  minCost: number;
  maxCost: number;
}

// --- Constants ---
const RATES = {
  labor: {
    standard: 12,    // Rs per sq ft
    good: 18,        // Rs per sq ft
    premium: 28,     // Rs per sq ft
  },
  material: {
    standard: 8,     // Rs per sq ft
    good: 14,        // Rs per sq ft
    premium: 22,     // Rs per sq ft
  },
  putty: 6,          // Rs per sq ft extra
  primer: 4,         // Rs per sq ft extra
  door: 800,         // Rs per door
  window: 500,       // Rs per window
  coatMultiplier: {
    1: 1.0,
    2: 1.6,
  },
  ceilingMultiplier: 0.4,   // adds 40% of floor area as ceiling area
  locationMultiplier: {
    dha: 1.15,
    gulshan: 1.0,
    bahria: 1.1,
    saddar: 0.95,
    korangi: 0.9,
    other: 1.0,
  }
};

const ROOM_NAMES = [
  'Living Room', 'Master Bedroom', 'Bedroom', 'Kitchen', 'Bathroom', 'Lounge', 'Dining Room', 'Office Room', 'Corridor', 'Other'
];

const SERVICE_TYPES = [
  'Interior Painting', 'Exterior Painting', 'Texture Work', 'Waterproofing', 'Wood Polish & Paint', 'Epoxy Floor Coating', 'Full Home Package'
];

const PROPERTY_TYPES = [
  'House / Bungalow', 'Apartment / Flat', 'Office / Commercial', 'Factory / Warehouse', 'Shop / Showroom'
];

const LOCATIONS = [
  { id: 'dha', label: 'DHA / Clifton / Defence' },
  { id: 'gulshan', label: 'Gulshan / North Nazimabad / PECHS' },
  { id: 'bahria', label: 'Bahria Town Karachi' },
  { id: 'saddar', label: 'Saddar / Old City Areas' },
  { id: 'korangi', label: 'Korangi / Landhi / Malir' },
  { id: 'other', label: 'Other Areas' }
];

// --- Component ---
const CostCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<CalculatorState>({
    serviceType: 'Interior Painting',
    propertyType: 'House / Bungalow',
    rooms: [{ id: 1, name: 'Living Room', length: 12, width: 10, height: 10 }],
    paintQuality: 'good',
    coats: 2,
    includesCeiling: true,
    includesDoors: 0,
    includesWindows: 0,
    includesWoodwork: false,
    includesPutty: true,
    includesPrimer: true,
    location: 'gulshan'
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
      rooms: [...prev.rooms, { id: newId, name: 'Bedroom', length: 12, width: 10, height: 10 }]
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
    // 1. Calculate Total Area
    let totalWallArea = 0;
    
    state.rooms.forEach(room => {
      // Wall Area = Perimeter * Height
      const perimeter = 2 * (Number(room.length) + Number(room.width));
      const wallArea = perimeter * Number(room.height);
      
      // Ceiling Area
      const ceilingArea = state.includesCeiling ? (Number(room.length) * Number(room.width)) : 0;
      
      totalWallArea += wallArea + ceilingArea;
    });

    // Subtract doors and windows area (approx)
    // Assuming standard door 21 sqft, window 12 sqft
    const doorsArea = state.includesDoors * 21;
    const windowsArea = state.includesWindows * 12;
    
    const netPaintableArea = Math.max(0, totalWallArea - doorsArea - windowsArea);

    // 2. Calculate Costs
    const quality = state.paintQuality as 'standard' | 'good' | 'premium';
    const loc = state.location as keyof typeof RATES.locationMultiplier;
    
    const locMultiplier = RATES.locationMultiplier[loc] || 1.0;
    const coatMult = RATES.coatMultiplier[state.coats as 1 | 2] || 1.0;

    // Base Rates
    const laborRate = RATES.labor[quality] * locMultiplier;
    const materialRate = RATES.material[quality] * locMultiplier;

    // Calculate Components
    const laborCost = netPaintableArea * laborRate * coatMult;
    const materialCost = netPaintableArea * materialRate * coatMult;
    
    const puttyCharge = state.includesPutty ? (netPaintableArea * RATES.putty * locMultiplier) : 0;
    const primerCharge = state.includesPrimer ? (netPaintableArea * RATES.primer * locMultiplier) : 0;
    
    const doorsCharge = state.includesWoodwork ? (state.includesDoors * RATES.door * locMultiplier) : 0;
    const windowsCharge = state.includesWoodwork ? (state.includesWindows * RATES.window * locMultiplier) : 0;
    const woodworkCharge = doorsCharge + windowsCharge;

    const totalCost = laborCost + materialCost + puttyCharge + primerCharge + woodworkCharge;

    setResult({
      laborCost,
      materialCost,
      puttyCharge,
      primerCharge,
      woodworkCharge,
      doorsCharge,
      windowsCharge,
      totalArea: netPaintableArea,
      totalCost,
      minCost: totalCost * 0.9,
      maxCost: totalCost * 1.1
    });
  };

  // Auto-calculate on state change if result is already shown
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
      rooms: [{ id: 1, name: 'Living Room', length: 12, width: 10, height: 10 }],
      paintQuality: 'good',
      coats: 2,
      includesCeiling: true,
      includesDoors: 0,
      includesWindows: 0,
      includesWoodwork: false,
      includesPutty: true,
      includesPrimer: true,
      location: 'gulshan'
    });
  };

  return (
    <>
      <Helmet>
        <title>Painting Cost Calculator | Sikander Arts – Karachi</title>
        <meta name="description" content="Use Sikander Arts' free painting cost calculator to estimate your painting project cost in Karachi. Get an instant estimate for interior, exterior, texture and more." />
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
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        step >= s ? 'bg-secondary text-white scale-110' : 'bg-gray-200 text-gray-500'
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
                          className={`p-3 rounded-xl text-sm font-medium text-left transition-all border ${
                            state.serviceType === type 
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
                          className={`p-3 rounded-xl text-sm font-medium text-left transition-all border ${
                            state.propertyType === type 
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
                      <CheckCircle2 size={20} className="text-secondary" /> Paint Quality
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'standard', label: 'Standard', sub: 'Economy (Local Brands)' },
                        { id: 'good', label: 'Good', sub: 'Mid-Range (Berger, Diamond)' },
                        { id: 'premium', label: 'Premium', sub: 'High-End (Dulux, Nippon)' }
                      ].map((q) => (
                        <button
                          key={q.id}
                          onClick={() => setState({ ...state, paintQuality: q.id })}
                          className={`p-4 rounded-xl text-left transition-all border-2 ${
                            state.paintQuality === q.id 
                              ? 'border-secondary bg-orange-50' 
                              : 'border-gray-100 bg-white hover:border-gray-200'
                          }`}
                        >
                          <div className={`font-bold ${state.paintQuality === q.id ? 'text-secondary' : 'text-gray-700'}`}>
                            {q.label}
                          </div>
                          <div className="text-xs text-gray-400">{q.sub}</div>
                        </button>
                      ))}
                    </div>
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
                      {LOCATIONS.map(loc => (
                        <option key={loc.id} value={loc.id}>{loc.label}</option>
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
                          {result.puttyCharge > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Putty Work</span>
                              <span className="font-medium">Rs. {Math.round(result.puttyCharge).toLocaleString()}</span>
                            </div>
                          )}
                          {result.primerCharge > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Primer Coat</span>
                              <span className="font-medium">Rs. {Math.round(result.primerCharge).toLocaleString()}</span>
                            </div>
                          )}
                          {result.woodworkCharge > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Woodwork/Doors</span>
                              <span className="font-medium">Rs. {Math.round(result.woodworkCharge).toLocaleString()}</span>
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
                        <a 
                          href="tel:+923001234567" 
                          className="w-full bg-gray-100 hover:bg-gray-200 text-primary py-3 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2"
                        >
                          <Phone size={18} /> Call Us Now
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

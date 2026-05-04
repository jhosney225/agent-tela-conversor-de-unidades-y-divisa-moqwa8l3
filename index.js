```javascript
#!/usr/bin/env node

const readline = require('readline');

// Tasas de cambio actualizadas (en relación a USD)
const exchangeRates = {
  'USD': 1,
  'EUR': 0.92,
  'GBP': 0.79,
  'JPY': 149.50,
  'AUD': 1.53,
  'CAD': 1.36,
  'CHF': 0.88,
  'CNY': 7.24,
  'INR': 83.12,
  'MXN': 17.05,
  'BRL': 4.97,
  'ARS': 350.00,
  'COP': 3980.00,
  'CLP': 850.00
};

// Conversiones de temperatura
const temperatureUnits = {
  'C': {
    toF: (c) => (c * 9/5) + 32,
    toK: (c) => c + 273.15
  },
  'F': {
    toC: (f) => (f - 32) * 5/9,
    toK: (f) => ((f - 32) * 5/9) + 273.15
  },
  'K': {
    toC: (k) => k - 273.15,
    toF: (k) => ((k - 273.15) * 9/5) + 32
  }
};

// Conversiones de longitud
const lengthUnits = {
  'mm': 0.001,
  'cm': 0.01,
  'm': 1,
  'km': 1000,
  'in': 0.0254,
  'ft': 0.3048,
  'yd': 0.9144,
  'mi': 1609.34,
  'nm': 1852
};

// Conversiones de peso
const weightUnits = {
  'mg': 0.000001,
  'g': 0.001,
  'kg': 1,
  'oz': 0.0283495,
  'lb': 0.453592,
  't': 1000
};

// Conversiones de volumen
const volumeUnits = {
  'ml': 0.001,
  'l': 1,
  'fl_oz': 0.0295735,
  'cup': 0.236588,
  'pint': 0.473176,
  'gallon': 3.78541,
  'm3': 1000
};

// Conversiones de velocidad
const speedUnits = {
  'mps': 1,          // metros por segundo
  'kph': 0.277778,   // kilómetros por hora
  'mph': 0.44704,    // millas por hora
  'knot': 0.51444    // nudos
};

class UnitConverter {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  convertLength(value, from, to) {
    if (!lengthUnits[from] || !lengthUnits[to]) {
      return 'Unidad de longitud no válida';
    }
    const meters = value * lengthUnits[from];
    return meters / lengthUnits[to];
  }

  convertWeight(value, from, to) {
    if (!weightUnits[from] || !weightUnits[to]) {
      return 'Unidad de peso no válida';
    }
    const kg = value * weightUnits[from];
    return kg / weightUnits[to];
  }

  convertVolume(value, from, to) {
    if (!volumeUnits[from] || !volumeUnits[to]) {
      return 'Unidad de volumen no válida';
    }
    const liters = value * volumeUnits[from];
    return liters / volumeUnits[to];
  }

  convertTemperature(value, from, to) {
    if (from === to) return value;
    if (!temperatureUnits[from] || !temperatureUnits[to]) {
      return 'Unidad de temperatura no válida';
    }
    const converter = temperatureUnits[from][`to${to}`];
    if (!converter) return 'Conversión no válida';
    return converter(value);
  }

  convertSpeed(value, from, to) {
    if (!speedUnits[from] || !speedUnits[to]) {
      return 'Unidad de velocidad no válida';
    }
    const mps = value * speedUnits[from];
    return mps / speedUnits[to];
  }

  convertCurrency(value, from, to) {
    from = from.toUpperCase();
    to = to.toUpperCase();
    
    if (!exchangeRates[from] || !exchangeRates[to]) {
      return 'Moneda no válida';
    }
    
    const usd = value / exchangeRates[from];
    return usd * exchangeRates[to];
  }

  displayMenu() {
    console.log('\n╔════════════════════════════════════════════════════╗');
    console.log('║       CONVERSOR DE UNIDADES Y DIVISAS              ║');
    console.log('╠════════════════════════════════════════════════════╣');
    console.log('║ 1. Convertir Longitud      (mm,cm,m,km,in,ft,mi)  ║');
    console.log('║ 2. Convertir Peso          (mg,g,kg,oz,lb)        ║');
    console.log('║ 3. Convertir Volumen       (ml,l,fl_oz,gallon)    ║');
    console.log('║ 4. Convertir Temperatura   (C,F,K
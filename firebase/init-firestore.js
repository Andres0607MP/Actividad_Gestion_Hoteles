#!/usr/bin/env node

/**
 * Script para inicializar Firestore con datos de ejemplo
 * Uso: node firebase/init-firestore.js
 */

const admin = require('firebase-admin');

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCa_4cGMpAtmoYISwBTuoYay_oEKlGbEQ8",
  authDomain: "pagina-funcional-dbf3f.firebaseapp.com",
  projectId: "pagina-funcional-dbf3f",
  storageBucket: "pagina-funcional-dbf3f.appspot.com",
  messagingSenderId: "424985149045",
  appId: "1:424985149045:web:1649034bd3e00c2a53c23c",
};

// Inicializar Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: firebaseConfig.projectId,
  });
}

const db = admin.firestore();

// Datos de ejemplo
const hotelData = [
  {
    nombre: 'Hotel Paradise',
    ciudad: 'Miami',
    pais: 'USA',
    estrelas: 5,
    descripcion: 'Lujo y confort en la playa',
    precioNoche: 250,
    telefono: '+1-305-555-0001',
    email: 'info@hotelparadise.com',
  },
  {
    nombre: 'Hotel Mountain View',
    ciudad: 'Denver',
    pais: 'USA',
    estrelas: 4,
    descripcion: 'Vistas montañosas increíbles',
    precioNoche: 180,
    telefono: '+1-303-555-0002',
    email: 'info@mountainview.com',
  },
  {
    nombre: 'Hotel Central',
    ciudad: 'Bogotá',
    pais: 'Colombia',
    estrelas: 4,
    descripcion: 'Centro de la ciudad, fácil acceso',
    precioNoche: 120,
    telefono: '+57-1-555-0003',
    email: 'info@hotelcentral.com.co',
  },
];

const habitacionesPorHotel = [
  // Paradise Hotel
  [
    {
      numero: 101,
      tipo: 'Suite',
      camas: 1,
      maxHuespedes: 2,
      precio: 250,
      servicios: ['WiFi', 'TV', 'Jacuzzi', 'Balcón'],
      estado: 'disponible',
    },
    {
      numero: 102,
      tipo: 'Doble',
      camas: 2,
      maxHuespedes: 4,
      precio: 200,
      servicios: ['WiFi', 'TV', 'Minibar'],
      estado: 'disponible',
    },
    {
      numero: 103,
      tipo: 'Suite Premium',
      camas: 1,
      maxHuespedes: 2,
      precio: 350,
      servicios: ['WiFi', 'TV', 'Jacuzzi', 'Balcón', 'Terraza'],
      estado: 'ocupada',
    },
    {
      numero: 201,
      tipo: 'Doble',
      camas: 2,
      maxHuespedes: 4,
      precio: 200,
      servicios: ['WiFi', 'TV'],
      estado: 'disponible',
    },
    {
      numero: 202,
      tipo: 'Simple',
      camas: 1,
      maxHuespedes: 1,
      precio: 150,
      servicios: ['WiFi', 'TV'],
      estado: 'disponible',
    },
  ],
  // Mountain View
  [
    {
      numero: 301,
      tipo: 'Suite',
      camas: 1,
      maxHuespedes: 2,
      precio: 180,
      servicios: ['WiFi', 'TV', 'Vista Montaña'],
      estado: 'disponible',
    },
    {
      numero: 302,
      tipo: 'Doble',
      camas: 2,
      maxHuespedes: 4,
      precio: 160,
      servicios: ['WiFi', 'TV'],
      estado: 'disponible',
    },
    {
      numero: 303,
      tipo: 'Suite Familiar',
      camas: 2,
      maxHuespedes: 6,
      precio: 220,
      servicios: ['WiFi', 'TV', 'Cocina', 'Sala'],
      estado: 'disponible',
    },
    {
      numero: 401,
      tipo: 'Simple',
      camas: 1,
      maxHuespedes: 1,
      precio: 100,
      servicios: ['WiFi', 'TV'],
      estado: 'ocupada',
    },
    {
      numero: 402,
      tipo: 'Doble',
      camas: 2,
      maxHuespedes: 4,
      precio: 160,
      servicios: ['WiFi', 'TV'],
      estado: 'disponible',
    },
  ],
  // Central Hotel
  [
    {
      numero: 501,
      tipo: 'Suite',
      camas: 1,
      maxHuespedes: 2,
      precio: 120,
      servicios: ['WiFi', 'TV'],
      estado: 'disponible',
    },
    {
      numero: 502,
      tipo: 'Doble',
      camas: 2,
      maxHuespedes: 4,
      precio: 100,
      servicios: ['WiFi', 'TV'],
      estado: 'disponible',
    },
    {
      numero: 503,
      tipo: 'Simple',
      camas: 1,
      maxHuespedes: 1,
      precio: 70,
      servicios: ['WiFi'],
      estado: 'disponible',
    },
    {
      numero: 601,
      tipo: 'Doble Premium',
      camas: 2,
      maxHuespedes: 4,
      precio: 140,
      servicios: ['WiFi', 'TV', 'Minibar'],
      estado: 'disponible',
    },
    {
      numero: 602,
      tipo: 'Suite',
      camas: 1,
      maxHuespedes: 2,
      precio: 130,
      servicios: ['WiFi', 'TV'],
      estado: 'ocupada',
    },
  ],
];

const reservasData = [
  {
    nombreHuesped: 'Juan García',
    email: 'juan@example.com',
    telefono: '+57-300-555-0001',
    hotelId: '', // Se llenará después
    habitacionId: '', // Se llenará después
    fechaEntrada: new Date(2026, 5, 15),
    fechaSalida: new Date(2026, 5, 20),
    adultos: 2,
    ninos: 0,
    precioTotal: 1000,
    estado: 'confirmada',
    notas: 'Llegada tardía',
  },
  {
    nombreHuesped: 'María López',
    email: 'maria@example.com',
    telefono: '+57-300-555-0002',
    hotelId: '', // Se llenará después
    habitacionId: '', // Se llenará después
    fechaEntrada: new Date(2026, 5, 10),
    fechaSalida: new Date(2026, 5, 12),
    adultos: 1,
    ninos: 2,
    precioTotal: 400,
    estado: 'confirmada',
    notas: 'Familia',
  },
];

async function initializeFirestore() {
  try {
    console.log('Iniciando Firestore con datos de ejemplo...\n');

    // Limpiar colecciones existentes (opcional - comentar si quieres preservar datos)
    // await cleanCollections();

    // 1. Crear hoteles
    console.log('📍 Creando hoteles...');
    const hotelIds = [];

    for (const hotel of hotelData) {
      const docRef = await db.collection('hoteles').add(hotel);
      hotelIds.push(docRef.id);
      console.log(`   ✓ ${hotel.nombre} (ID: ${docRef.id})`);
    }

    // 2. Crear habitaciones
    console.log('\n🛏️  Creando habitaciones...');
    const habitacionIds = [];

    for (let i = 0; i < hotelData.length; i++) {
      const habitacionesHotel = [];

      for (const habitacion of habitacionesPorHotel[i]) {
        const docRef = await db
          .collection('hoteles')
          .doc(hotelIds[i])
          .collection('habitaciones')
          .add(habitacion);
        habitacionesHotel.push(docRef.id);
        console.log(
          `   ✓ ${hotelData[i].nombre} - Habitación ${habitacion.numero} (ID: ${docRef.id})`
        );
      }

      habitacionIds.push(habitacionesHotel);
    }

    // 3. Crear reservas
    console.log('\n📅 Creando reservas...');

    for (let i = 0; i < reservasData.length; i++) {
      const reserva = reservasData[i];
      const hotelIndex = i % hotelIds.length;
      const habitacionIndex = i % habitacionIds[hotelIndex].length;

      reserva.hotelId = hotelIds[hotelIndex];
      reserva.habitacionId = habitacionIds[hotelIndex][habitacionIndex];

      const docRef = await db.collection('reservas').add(reserva);
      console.log(
        `   ✓ ${reserva.nombreHuesped} en ${hotelData[hotelIndex].nombre} (ID: ${docRef.id})`
      );
    }

    console.log('\n✅ Firestore inicializado correctamente!');
    console.log('\nColecciones creadas:');
    console.log(`   - hoteles: ${hotelIds.length} documentos`);
    console.log(
      `   - habitaciones: ${habitacionIds.reduce((a, b) => a + b.length, 0)} documentos`
    );
    console.log(`   - reservas: ${reservasData.length} documentos`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error inicializando Firestore:', error);
    process.exit(1);
  }
}

async function cleanCollections() {
  console.log('Limpiando colecciones existentes...\n');

  const collections = ['hoteles', 'habitaciones', 'reservas'];

  for (const collectionName of collections) {
    const snapshot = await db.collection(collectionName).get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`   ✓ ${collectionName} limpiado`);
  }
}

// Ejecutar
initializeFirestore();

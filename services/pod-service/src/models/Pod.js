const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const polygonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Polygon'],
        required: true
    },
    coordinates: {
        type: [[[Number]]],
        required: true
    }
});

const podSchema = new mongoose.Schema({
    podId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['autonomous', 'semi-autonomous', 'manual'], required: true },
    category: { type: String, enum: ['passenger', 'cargo', 'service'], required: true },
    status: { type: String, enum: ['active', 'charging', 'offline', 'maintenance', 'emergency'], default: 'offline', index: true },
    hardware: {
        serialNumber: String,
        firmwareVersion: String,
        hardwareVersion: String,
        manufacturer: String,
        model: String,
        yearManufactured: Number,
        lastMaintenance: Date,
        nextMaintenanceDue: Date,
        maintenanceIntervalKm: Number,
        totalKmDriven: { type: Number, default: 0 },
    },
    battery: {
        type: { type: String, enum: ['Li-ion', 'Solid-state'] },
        capacity: Number, // kWh
        currentLevel: { type: Number, default: 100, index: true }, // percentage
        currentVoltage: Number,
        health: { type: Number, default: 100 }, // percentage
        cycleCount: { type: Number, default: 0 },
        estimatedRange: Number, // km
        chargingStatus: { type: String, enum: ['idle', 'charging', 'fast-charging'], default: 'idle' },
        lastCharged: Date,
        degradationRate: { type: Number, default: 0 }, // per year
    },
    location: {
        type: pointSchema,
        index: '2dsphere'
    },
    currentAddress: String,
    geofence: {
        type: polygonSchema
    },
    homeStation: {
        id: String,
        name: String,
        coordinates: [Number]
    },
    capacity: {
        seats: Number,
        maxPassengers: Number,
        maxLoad: Number, // kg
        cargoVolume: Number // liters
    },
    sensors: {
        lidar: Boolean,
        radar: Boolean,
        cameras: Number,
        ultrasonic: Boolean,
        gps: Boolean,
        imu: Boolean,
        temperature: Boolean
    },
    connectivity: {
        mqtt: {
            clientId: String,
            connected: { type: Boolean, default: false, index: true },
            lastSeen: Date
        },
        cellular: {
            imei: String,
            carrier: String,
            signalStrength: Number
        },
        wifi: {
            enabled: Boolean,
            ssid: String
        }
    },
    assignedOperator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    assignedRegion: { type: String, index: true },
    availableForRides: { type: Boolean, default: true },
    predictedIssues: [{
        component: String,
        probability: Number,
        estimatedFailureDate: Date,
        severity: String
    }],
    tags: [String],
    notes: String,
    lastActive: { type: Date, index: true },
    lastTelemetryUpdate: Date
}, { timestamps: true });

module.exports = mongoose.model('Pod', podSchema);
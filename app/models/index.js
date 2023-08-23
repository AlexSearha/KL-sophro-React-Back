const Appointment = require("./Appointment");
const Client = require("./Client");
const Doctor = require("./Doctor");
const Role = require("./Role");

// Relation CLIENT - APPOINTMENT
Client.hasMany(Appointment, {
    foreignKey: 'client_id',
    as: 'appointments'
});

Appointment.belongsTo(Client, {
    foreignKey: 'client_id',
    as: 'client'
});

// Relation DOCTOR - APPOINTMENT
Doctor.hasMany(Appointment, {
    foreignKey: 'doctor_id',
    as: 'appointments'
});

Appointment.belongsTo(Doctor, {
    foreignKey: 'doctor_id',
    as: 'doctor'
});

// Relation ROLE - CLIENT
Role.hasMany(Client, {
    foreignKey: 'role_id',
    as: 'clients'
});

Client.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role'
});

// Relation ROLE - DOCTOR
Role.hasOne(Doctor, {
    foreignKey: 'role_id',
});

Doctor.belongsTo(Role);


module.exports = { Client, Appointment, Doctor, Role };
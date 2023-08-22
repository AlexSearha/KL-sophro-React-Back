import Appointment from "./Appointment";
import Client from "./Client";
import Doctor from "./Doctor";
import Role from "./Role";

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

// Relation DOCTOR - ROLE
Doctor.hasOne(Role, {
    foreignKey: 'role_id'
});

Role.hasOne(Doctor);


export default { Client, Appointment, Doctor, Role }
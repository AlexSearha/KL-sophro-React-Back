const Appointment = require("./Appointment");
const Client = require("./Client");
const Doctor = require("./Doctor");
const Protocol = require("./Protocols");
const Role = require("./Role");

// Relation CLIENT - PROTOCOL
Client.hasMany(Protocol, {
    foreignKey: "client_id",
    as: "protocols"
});
Protocol.belongsTo(Client, {
    foreignKey: "client_id",
    as: "client"
})

// Relation DOCTOR - PROTOCOL
Doctor.hasMany(Protocol, {
    foreignKey: "doctor_id",
    as: "protocols"
});
Protocol.belongsTo(Doctor, {
    foreignKey: "doctor_id",
    as: "doctor"
});

// Relation PROTOCOL - APPOINTMENT
Protocol.hasMany(Appointment, {
    foreignKey: "protocol_id",
    as: "appointments"
});
Appointment.belongsTo(Protocol, {
    foreignKey: "appointment_id",
    as: "protocol"
})

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


module.exports = { Client, Appointment, Doctor, Role, Protocol };
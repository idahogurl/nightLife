module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    'Reservation', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        field: 'user_id',
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'reservations',
      underscored: true,
      paranoid: false,
      timestamps: false,
      indexes: [
        {
          name: 'reservation_user_id_index',
          method: 'BTREE',
          fields: ['user_id'],
        },
        {
          name: 'reservation_created_at_index',
          method: 'BTREE',
          fields: ['created_at'],
        },
      ],
    },
  );

  return Reservation;
};

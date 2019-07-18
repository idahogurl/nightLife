module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'reservations',
        {
          id: {
            type: Sequelize.DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
          },
          user_id: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
          },
        },
        {
          transaction,
        },
      );
      await queryInterface.addIndex(
        'reservations',
        {
          name: 'reservation_user_id_index',
          method: 'BTREE',
          fields: ['user_id'],
        },
        {
          transaction,
        },
      );
      await queryInterface.addIndex(
        'reservations',
        {
          name: 'reservation_created_at_index',
          method: 'BTREE',
          fields: ['created_at'],
        },
        {
          transaction,
        },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },
  down: queryInterface => queryInterface.dropTable('reservations'),
};

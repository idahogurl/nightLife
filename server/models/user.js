import crypto from 'crypto';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      displayName: {
        field: 'display_name',
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        allowNull: false,
      },
      gravatar: {
        type: DataTypes.VIRTUAL,
        get: () => {
          if (!this.getDataValue('email')) {
            return 'https://gravatar.com/avatar/?s=200&d=retro';
          }
          const md5 = crypto.createHash('md5').update(this.getDataValue('email')).digest('hex');
          return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
        },
      },
    },
    {
      tableName: 'users',
      underscored: true,
      paranoid: true,
      indexes: [{
        name: 'user_deleted_at_index',
        method: 'BTREE',
        fields: ['deleted_at'],
      }],
    },
  );

  User.associate = ({ Poll }) => {
    User.hasMany(Poll);
  };

  return User;
};

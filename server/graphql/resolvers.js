import GraphQLToolTypes from 'graphql-tools-types';
import { Op } from 'sequelize';

import { sequelize, Reservation } from '../models';

const parseWhere = function parseWhere(where) {
  if (where) {
    return JSON.parse(where);
  }
  return {};
};

// Create resolver functions based on schema.gql
export default {
  UUID: GraphQLToolTypes.UUID({ name: 'UUID', storage: 'string' }),
  JSON: GraphQLToolTypes.JSON({ name: 'JSON' }),
  Date: GraphQLToolTypes.Date({ name: 'Date' }),
  Void: GraphQLToolTypes.Void({ name: 'Void' }),
  Mutation: {
    toggleReservation: async (_, { id, userId }) => {
      try {
        const reservation = await Reservation.findOne({
          where: {
            [Op.and]: [
              { id },
              { userId },
              sequelize.where(
                sequelize.fn('DATE', sequelize.col('created_at')),
                sequelize.literal('CURRENT_DATE'),
              ),
            ],
          },
        });

        if (reservation) {
          await Reservation.destroy({ where: { id, userId } });
        } else {
          await Reservation.create({ id, userId, createdAt: new Date() });
        }

        const reservationCount = await Reservation.findOne({
          attributes: ['id', [sequelize.fn('COUNT', sequelize.col('user_id')), 'rsvpCount']],
          where: {
            [Op.and]: [
              { id },
              sequelize.where(
                sequelize.fn('DATE', sequelize.col('created_at')),
                sequelize.literal('CURRENT_DATE'),
              ),
            ],
          },
          group: ['id'],
          raw: true,
        });

        if (reservationCount === null) {
          return { id, rsvpCount: 0 };
        }

        return reservationCount;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
  Query: {
    reservations: async (_, { ids }) => {
      const reservations = await Reservation.findAll({
        attributes: ['id', [sequelize.fn('COUNT', sequelize.col('user_id')), 'rsvpCount']],
        where: {
          [Op.and]: [
            { id: { [Op.in]: ids } },
            sequelize.where(
              sequelize.fn('DATE', sequelize.col('created_at')),
              sequelize.literal('CURRENT_DATE'),
            ),
          ],
        },
        group: ['id'],
        raw: true,
      });
      return reservations;
    },
    reservation: async (_, { id, where }) => {
      const reservation = await Reservation.findById({ id, where: parseWhere(where) });
      return reservation;
    },
  },
};

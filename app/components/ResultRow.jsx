import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AWN from 'awesome-notifications';

import ResultImage from './ResultImage';

import onError from '../utils/onError';
import GET_RESERVATIONS from '../graphql/Reservations.gql';

class ResultRow extends Component {
  state = {
    isSubmitting: false,
  }

  onClick = this.onClick.bind(this)

  async onClick() {
    const {
      result: { id }, userId, mutate, ids,
    } = this.props;

    if (!userId) {
      const options = {
        position: 'top-right',
      };

      const notifier = new AWN(options);
      notifier.alert('Must be logged in to RSVP');
      return;
    }

    this.setState({ isSubmitting: true });
    try {
      await mutate({
        variables: { id, userId },
        update: (cache, { data: { toggleReservation } }) => {
          const args = {
            query: GET_RESERVATIONS,
            variables: { ids },
          };

          const { reservations } = cache.readQuery(args);
          const index = reservations.findIndex(r => r.id === toggleReservation.id);

          if (index !== -1) {
            reservations[index] = toggleReservation;
          } else {
            reservations.push(toggleReservation);
          }
          args.data = { reservations };
          cache.writeQuery(args);
        },
      });
      this.setState({ isSubmitting: false });
    } catch (e) {
      onError(e);
      this.setState({ isSubmitting: false });
    }
  }

  render() {
    const {
      result: {
        image_url: imageUrl, name, rating, review_count: reviewCount,
      },
      rsvpCount,
    } = this.props;

    const { isSubmitting: disabled } = this.state;

    return (
      <tr>
        <td className="align-middle text-center" style={{ width: '100px' }}>
          {imageUrl ? <ResultImage src={imageUrl} /> : <i className="fa fa-3x fa-picture-o" />}
        </td>
        <td>
          <div className="row">
            <div className="col-4">
              <strong>{name}</strong>
              <p>
              Rating: {rating}<br />
              Reviews: {reviewCount}
              </p>
            </div>
            <div className="col">
              <button className="btn btn-primary" onClick={this.onClick} disabled={disabled}>
                {disabled ? <span><i className="fa fa-spinner fa-spin text-center" /> Saving</span> : `${rsvpCount} Going`}
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

ResultRow.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    review_count: PropTypes.number.isRequired,
  }).isRequired,
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  mutate: PropTypes.func.isRequired,
  rsvpCount: PropTypes.number.isRequired,
  userId: PropTypes.string,
};

ResultRow.defaultProps = {
  userId: null,
};

export default ResultRow;

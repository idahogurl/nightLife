import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import ResultRow from './ResultRow';
import onError from '../utils/onError';
import GET_RESERVATIONS from '../graphql/Reservations.gql';
import SET_RESERVE from '../graphql/Reserve.gql';

const Results = function Results(props) {
  const ids = props.results.map(r => r.id);

  return (
    <Mutation mutation={SET_RESERVE}>
      {mutate => (
        <Query query={GET_RESERVATIONS} variables={{ ids }} fetchPolicy="cache-and-network">
          {({ loading, error, data: { reservations } }) => {
          if (loading) return <i className="fa fa-3x fa-spinner fa-spin" />;

          if (error) {
            onError(error);
            return null;
          }

          return (
            <table className="table table-striped">
              <tbody>
                {props.results.map((r) => {
                const location = reservations.length ?
                  reservations.find(d => d.id === r.id) : false;
                const rsvpCount = location ? location.rsvpCount : 0;

                return (<ResultRow
                  result={r}
                  mutate={mutate}
                  ids={ids}
                  userId={props.userId}
                  rsvpCount={rsvpCount}
                  key={r.id}
                />);
              })}
              </tbody>
            </table>);
      }}
        </Query>)
  }
    </Mutation>);
};

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    review_count: PropTypes.number.isRequired,
  })).isRequired,
  userId: PropTypes.string,
};

Results.defaultProps = {
  userId: null,
};
export default Results;

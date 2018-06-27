import AWN from 'awesome-notifications';

export default function onError(err) {
  const options = {
    position: 'top-right',
  };

  const notifier = new AWN(options);
  notifier.alert('An unexpected error occurred. Contact support if this issue continues.');
  console.error(err);
}

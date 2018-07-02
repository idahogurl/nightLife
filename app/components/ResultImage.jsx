import { createComponent } from 'react-fela';

const ResultImage = function NavBarImage({ src }) {
  return {
    backgroundImage: `url("${src}")`,
    backgroundSize: 'cover',
    width: '100px',
    height: '100px',
  };
};


export default createComponent(ResultImage);

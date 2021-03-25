import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Dashboard.module.css';

import { Button } from '../../components';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();

  return (
    <>
      {user ? (
        <Button label="Write" onClick={() => history.push('/emails/send')} />
      ) : null}
    </>
  );
};

export default Dashboard;

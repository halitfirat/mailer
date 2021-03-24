import { useHistory } from 'react-router-dom';

import { Button } from '../../components';

const Dashboard = () => {
  const history = useHistory();

  return <Button label="Write" onClick={() => history.push('/emails/new')} />;
};

export default Dashboard;

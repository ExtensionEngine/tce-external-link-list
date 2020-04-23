import * as yup from 'yup';
import Edit from './edit';

const str = yup.string().trim().min(1).max(500).required();

const schema = {
  items: yup.array().min(1).of(yup.object().shape({ title: str, url: str })),
  title: str
};

const initState = () => ({ items: [], title: '' });

export default {
  name: 'External Link List',
  type: 'EXTERNAL_LINK_LIST',
  version: '1.0',
  schema,
  initState,
  Edit,
  ui: {
    icon: 'mdi-open-in-new',
    forceFullWidth: true
  }
};

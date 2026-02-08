import InputField from './input/input';
import Button from './button/button';
import DynamicModalProps from './modal/modal';
import DynamicTable from './table/table';
// ComponentHandler contains all reusable components
const ComponentHandler = {
  Input: InputField,
  Button: Button,
  Modal : DynamicModalProps,
  DynamicTable : DynamicTable,
};

export default ComponentHandler;

import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function ItineraryToggleButton(props) {
  const [state, setState] = React.useState({
    checked: true,
    labelName: 'Booked'
  });

  const handleChange = name => event => {
    const label = state.checked ? 'Hosting' : 'Booked';
    setState({ ...state, checked: !state.checked, labelName: label });
    props.switch(state.checked);
  };

  return (
    <FormGroup style={{ display: 'inline-block', paddingLeft: '10px' }}>
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange('checked')}
            value="checked"
            color="primary"
          />
        }
        label={state.labelName}
      />
    </FormGroup>
  );
}
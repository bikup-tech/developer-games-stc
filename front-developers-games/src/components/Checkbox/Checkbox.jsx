import React from 'react';

import './Checkbox.scss';

function Checkbox({
  text, name, isChecked, onChange,
}) {
  return (
    <div className="input__checkbox">
      <input type="checkbox" name={name} id="animatedCheckbox" checked={isChecked} onChange={onChange} />
      <label htmlFor="animatedCheckbox">{text}</label>
    </div>
  );
}

export default Checkbox;

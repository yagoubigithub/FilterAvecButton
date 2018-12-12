import React, { Component } from "react";

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Helmet from "react-helmet";



class DatePicker extends Component {
  state = {
    to: undefined,
    from: undefined
  };
  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    /*if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }*/
  }
  handleFromChange(from) {
    // Change the from date and focus the "to" input field

    const d = new Date(from).toISOString().slice(0, 10);
    this.props.sendDatePickerData({from : d});
    this.setState({ from });
  }
  handleToChange(to) {
    const d = new Date(to).toISOString().slice(0, 10);
    this.props.sendDatePickerData({to : d});
    console.log(d);
    this.setState({ to } , this.showFromMonth);
  }

  render() {
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <span className="InputFromTo">
        <DayPickerInput
          placeholder="Date début"
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.to.getInput().focus()
          }}
          onDayChange={this.handleFromChange}
        />{" "}
        —{" "}
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={el => (this.to = el)}
            placeholder="Date fin"
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2
            }}
            onDayChange={this.handleToChange}
          />
        </span>
        <Helmet>
          <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f866 !important;
    color: #4a90e2;
    
  }
  .DayPickerInput input{
    width : 150px ;
    padding : 15px;
    box-sizing : border-box;
  }
  
  
  .InputFromTo .DayPickerInput-Overlay {
    width: 550px;
    background : #f2f8ff !important;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
`}</style>
        </Helmet>
      </span>
    );
  }
}

export default DatePicker;

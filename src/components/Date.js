import React, { Component } from "react";

import moment from "moment";
import Helmet from "react-helmet";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";


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
    background-color: #f0f8ff !important;
    color: #4a90e2;
    
  }
  
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 550px;
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

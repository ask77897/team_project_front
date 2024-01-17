import React from 'react';
import '../App.css';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel } from '@syncfusion/ej2-react-schedule';
import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.localData = {
            dataSource: [
                {
                    Id: 1,
                    End: new Date(2019, 0, 11, 6, 30),
                    Start: new Date(2019, 0, 11, 4, 0),
                    Summary: '',
                    IsAllDay: true,
                    RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=10',
                    IsBlock: true
                },
                {
                    Id: 2,
                    End: new Date(2019, 0, 21, 8, 30),
                    Start: new Date(2019, 0, 21, 7, 0),
                    Summary: 'Meeting',
                    IsReadonly: true
                }
            ],
            fields: {
                subject: { name: 'Summary', default: 'No title is provided.' },
                startTime: { name: 'Start' },
                endTime: { name: 'End' }
            }
        };
    }

    render() {
        return (
            <>
                <ScheduleComponent
                    currentView='Month'
                    selectedDate={new Date(2019, 0, 11)}
                    eventSettings={this.localData}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                </ScheduleComponent>
                <div className='text-end'>
                    <Link to={"/home"}><button className="post-view-go-list-btn"><IoArrowBack /></button></Link>
                </div>
            </>

        );
    }
}

export default App;

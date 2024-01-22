import React from 'react';
import '../layout/main.css';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel } from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data'
import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.localData = {
            dataSource: [{
                EndTime: new Date(2019, 0, 11, 6, 30),
                StartTime: new Date(2019, 0, 11, 4, 0)
            }]
        };

        this.remoteData = new DataManager({
            url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
            adaptor: new WebApiAdaptor(),
            crossDomain: true
        });
    }

    render() {
        return React.createElement(
            ScheduleComponent,
            {
                currentView: "Month",
                selectedDate: new Date(2017, 5, 5),
                eventSettings: { dataSource: this.remoteData }
            },
            React.createElement(Inject, { services: [Day, WorkWeek, Month, Agenda] })
        );
    }
}

export default App;

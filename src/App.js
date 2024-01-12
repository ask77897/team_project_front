import './App.css';
import HeaderPage from './components/HeaderPage';
import {Container} from 'react-bootstrap'
import RouterPage from './components/RouterPage';
import { useState } from 'react';
import { BoxContext } from './components/BoxContext';
import BoxModal from './components/BoxModal';

const App = () =>{
    
    const [box, setBox] = useState({
        show:false,
        message:'',
        action:null

    });

	return (
		<BoxContext.Provider value={{box, setBox}}>
            <Container>
                <HeaderPage/>
                {box.show && <BoxModal/>}
                <RouterPage/>
            </Container>
        </BoxContext.Provider>
	);
}

export default App;

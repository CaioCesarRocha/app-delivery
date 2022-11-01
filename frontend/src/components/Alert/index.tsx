import { ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface propsSuccesAlert{
    theme: 'light' | 'dark' | 'colored';
}

const Alert = (props: propsSuccesAlert) =>{
    return(
        <div>   
            <ToastContainer autoClose={3000} theme={props.theme} position={'top-center'}/>
        </div>      
    )
}

export default Alert;
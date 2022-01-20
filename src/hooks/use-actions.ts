import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';


// this is a helper function that has bind all action creators to dispatch once
// otherwise have to declaire dispatch everytime want to use it
// this is just a little cleaner for reuse
export const useActions = () => {
    const dispatch = useDispatch();

    // bind action creators to the dispatch method
    return bindActionCreators(actionCreators, dispatch);
}

// can use this code now, i.e. action named sendThing
// const { sendThing } = useActions();
// sendThing(newThingToUpdateState)
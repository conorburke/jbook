import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';


// this is a helper function that has bind all action creators to dispatch once
// otherwise have to declaire dispatch everytime want to use it
// this is just a little cleaner for reuse
export const useActions = () => {
    const dispatch = useDispatch();


    // with use memo, we only bind action creators once
    // now react won't think the action cretors change, so we won't get infinite loops
    // this solves issue with using createBundles in CodeCell.tsx
    return useMemo(() => {
        // bind action creators to the dispatch method
        return bindActionCreators(actionCreators, dispatch);
    }, [dispatch]);
}

// can use this code now, i.e. action named sendThing
// const { sendThing } = useActions();
// sendThing(newThingToUpdateState)
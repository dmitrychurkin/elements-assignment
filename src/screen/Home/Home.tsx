import { FC, memo } from "react";
import { useStoreActions, useStoreState } from "../../store";
import EnhancedTable from "./EnhancedTable";


const Home: FC = () => {

    const toggleVisible = useStoreActions(actions => actions.toggleVisible);
    const cities = useStoreState(state => state.cities);

    return (
        <EnhancedTable
            rows={cities.map(({ city, ...restData }) => ({
                city: city.name,
                picture: city.picture,
                ...restData
            }))}
            onToggleHide={toggleVisible}
        />
    );
};

export default memo(Home);

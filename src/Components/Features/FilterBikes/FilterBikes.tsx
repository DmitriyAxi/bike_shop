import {Button, Modal} from "react-bulma-components";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import  {IFilterCriteria} from "../../../Store/BikesSlice"
import {RootState} from "../../../Store/Store.ts";
import {filterBikes} from "../../../Store/BikesSlice";

export default function FilterBikes() {
    const [isActive, setIsActive] = useState(false)
    const [filters, setFilters] = useState<IFilterCriteria>({
        BikeTypes: [],
        Brand: '',
        Price: { PriceFrom: 0, PriceTo: Infinity },
        FrameSize: '',
        InStock: false,
    });

    const bikeList = useSelector((state: RootState) => state.bikes.bikes);
    const dispatch = useDispatch()

    const handleCloseModal = () => {
        setIsActive(false)
    }

    const handleSwitchInStock = (check: boolean) => {
        setFilters((filter) => ({...filter, InStock: check}))
    };

    const handleApplyFilters = () => {
        dispatch(filterBikes(filters));
        handleCloseModal();
    };
    
    const uniqueBikeTypes = Array.from(new Set((bikeList.map((bike) => bike.type)))) 
    const uniqueBikeBrands = Array.from(new Set((bikeList.map((bike) => bike.brand))))
    const uniqueFrameSize = Array.from(new Set((bikeList.flatMap((bike) => bike.specifications.frameSize))))

    return (
        <>
            <Button onClick={() => setIsActive(true)}>
                Filter
            </Button>
            <Modal 
                show={isActive}
                showClose={true}
                onClose={handleCloseModal}
                closeOnBlur={true}
                closeOnEsc={true}
            >
                <Modal.Card>
                    <Modal.Card.Header>
                        <Modal.Card.Title>
                            Choose filter
                        </Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        <div>
                            <span>Bike type:</span>
                            {uniqueBikeTypes.map((bikeType) =>
                                <label style={{marginLeft: "10px"}}>
                                    <input type="checkbox"/>
                                    <span>{bikeType}</span>
                                </label>
                            )}
                        </div>
                        <div>
                            <span>Bike brand:</span>
                            {uniqueBikeBrands.map((bikeBrand) =>
                                <label style={{marginLeft: "10px"}}>
                                    <input type="checkbox"/>
                                    <span>{bikeBrand}</span>
                                </label>
                            )}
                        </div>
                        <div>
                            <span>Price range: </span>
                            <input
                                // onChange={handleChange}
                                placeholder="From"
                            />
                            <span> - </span>
                            <input
                                // onChange={handleChange}
                                placeholder="To"
                            />
                        </div>
                        <div>
                            <span>Frame size:</span>
                            {uniqueFrameSize.map((frameSize) =>
                                <label style={{marginLeft: "10px"}}>
                                    <input type="checkbox"/>
                                    <span>{frameSize}</span>
                                </label>
                            )}
                        </div>
                        <div>
                            <span>In stock:</span>
                            <label style={{marginLeft: "10px"}}>
                                <input 
                                    type="checkbox" 
                                    onChange={(event) => handleSwitchInStock((event.target.checked))}/>
                                <span>In stock</span>
                            </label>
                        </div>
                    </Modal.Card.Body>
                    <Modal.Card.Footer justifyContent="end">
                        <Button onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={handleApplyFilters}>
                            Save
                        </Button>
                    </Modal.Card.Footer>
                </Modal.Card>
            </Modal>
        </>
    );
}
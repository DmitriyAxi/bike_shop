import {Button, Modal} from "react-bulma-components";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDefaultFilterCriteria, IFilterCriteria, IPriceRange} from "../../../Store/BikesSlice"
import {RootState} from "../../../Store/Store.ts";
import {filterBikes} from "../../../Store/BikesSlice";

export default function FilterBikes() {
    const [isActive, setIsActive] = useState(false)
    const [filters, setFilters] = useState<IFilterCriteria>(getDefaultFilterCriteria());
    const filtersFromStore = useSelector((state: RootState) => state.bikes.filterCriteria)

    const dispatch = useDispatch()
    
    const handleCloseModal = () => {
        setIsActive(false)
        setFilters(getDefaultFilterCriteria())
    }

    const handleApplyFilters = () => {
        dispatch(filterBikes(filters));
        handleCloseModal();
    };

    const handleChangeBrand = (brand: string) => {
        setFilters((prevFilters) => {
            const newBrands = prevFilters.Brand.includes(brand)
                ? prevFilters.Brand.filter((b) => b !== brand)
                : [...prevFilters.Brand, brand]
            return { ...prevFilters, Brand: newBrands }
        });
    };

    const handleChangeType = (type: string) => {
        setFilters((prevFilters) => {
            const newBrands = prevFilters.BikeTypes.includes(type)
                ? prevFilters.BikeTypes.filter((t) => t !== type)
                : [...prevFilters.BikeTypes, type]
            return { ...prevFilters, BikeTypes: newBrands }
        });
    };

    const handleFrameSize = (frameSize: string) => {
        setFilters((prevFilters) => {
            const newBrands = prevFilters.FrameSize.includes(frameSize)
                ? prevFilters.FrameSize.filter((f) => f !== frameSize)
                : [...prevFilters.FrameSize, frameSize]
            return { ...prevFilters, FrameSize: newBrands }
        });
    };

    const handleChangePrice = (priceRange: IPriceRange) => {
        setFilters((prevFilters) => ({...prevFilters, Price: [priceRange]}));
    };

    const handleInStock = (checked: boolean) => {
        setFilters((prevFilters) => ({...prevFilters, InStock: checked}));
    };

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
                            {filtersFromStore.BikeTypes.map((bikeType) =>
                                <label style={{marginLeft: "10px"}}>
                                    <input 
                                        type="checkbox"
                                        onChange={() => handleChangeType(bikeType)}
                                    />
                                    <span>{bikeType}</span>
                                </label>
                            )}
                        </div>
                        <div>
                            <span>Bike brand:</span>
                            {filtersFromStore.Brand.map((bikeBrand) =>
                                <label style={{marginLeft: "10px"}}>
                                    <input 
                                        type="checkbox"
                                        onChange={() => handleChangeBrand(bikeBrand)}
                                    />
                                    <span>{bikeBrand}</span>
                                </label>
                            )}
                        </div>
                        <div>
                            <span>Price range: </span>
                            {filtersFromStore.Price.map((price) => (
                                <label key={price.id} style={{ marginLeft: "10px" }}>
                                    <input
                                        type="radio"
                                        name="priceRange" 
                                        onChange={() => handleChangePrice(price)}
                                    />
                                    <span>{price.name}</span>
                                </label>
                            ))}
                        </div>
                        <div>
                            <span>Frame size:</span>
                            {filtersFromStore.FrameSize.map((frameSize) =>
                                <label style={{marginLeft: "10px"}}>
                                    <input 
                                        type="checkbox"
                                        onChange={() => handleFrameSize(frameSize)}
                                    />
                                    <span>{frameSize}</span>
                                </label>
                            )}
                        </div>
                        <div>
                            <span>In stock:</span>
                            <label style={{marginLeft: "10px"}}>
                                <input 
                                    type="checkbox" 
                                    onChange={(event) => handleInStock(event.target.checked)}
                                />
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